import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { MailService } from 'src/services/mail.services';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  model = new PrismaClient();
  private stripe: Stripe;
  private sendEmailService: MailService;

  constructor() {
    this.stripe = new Stripe(
      'sk_test_51QUamvJwBLm6t1fhXJgepzoJWxiwr5Mf5ylqJ2raMfNREiN2sx82ibQjEe9DVZe7xYtJ7w0LlaZv7LIy4OuFDghq006thX2kyS',
    );
    this.sendEmailService = new MailService();
  }

  async create(accountId: number, createPaymentDto: any) {
    // Lấy email
    const email_user = await this.model.account.findUnique({
      where: { account_id: accountId },
    });
    // Kiểm tra xem người dùng đã có customer_id trong Stripe chưa
    const cartItems = await this.model.cart.findMany({
      where: {
        account_id: accountId,
      },
      include: {
        product: true,
      },
    });
    const lineItems = cartItems.map((item) => {
      // const imageUrlBE = `${process.env.SERVER_URL}/public${item.product.image_path}`;
      const imageUrlBE =
        'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png';

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.product_name,
            images: [imageUrlBE], // k hiển thị dc ảnh vì đang chạy bằng localhost nên chạy bằng ảnh cố định
          },
          unit_amount: item.product.output_price * 100,
        },
        quantity: item.quantity,
      };
    });

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email_user.email,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'KE', 'VN'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'usd',
            },
            display_name: 'Free shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 1500,
              currency: 'usd',
            },
            display_name: 'Next day air',
            // Delivers in exactly 1 business day
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 1,
              },
              maximum: {
                unit: 'business_day',
                value: 1,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL}/my-orders`,
      cancel_url: `${process.env.CLIENT_URL}/tablecart`,
      metadata: {
        account_id: accountId,
      },
    });
    return {
      status: 200,
      message: 'Checkout session created successfully',
      url: session.url,
    };
  }

  async createCashPayment(accountId: number, createPaymentDto: any) {
    try {
      // Get user email
      const email_user = await this.model.account.findUnique({
        where: { account_id: accountId },
      });

      // Get cart items
      const cartItems = await this.model.cart.findMany({
        where: {
          account_id: accountId,
        },
        include: {
          product: true,
        },
      });

      // Calculate total amount
      const totalAmount = cartItems.reduce((total, item) => {
        return total + item.product.output_price * item.quantity;
      }, 0);

      // Create order with cash payment status
      const order = await this.model.order.create({
        data: {
          account_id: accountId,
          total_price: totalAmount,
          payment_status: 'pending', 
          payment_method: 'cash',
          shipping_address: createPaymentDto.shippingAddress,
        },
      });

      // Create order items
      const orderItems = await Promise.all(
        cartItems.map(async (item) => {
          return {
            order_id: order.order_id,
            product_id: item.product.product_id,
            quantity: item.quantity,
            price: item.product.output_price,
          };
        }),
      );

      // Save order items
      await this.model.order_item.createMany({
        data: orderItems,
      });

      // Clear cart
      await this.model.cart.deleteMany({
        where: {
          account_id: accountId,
        },
      });

      // Update product quantities
      await Promise.all(
        orderItems.map(async (item) => {
          const product = await this.model.product.findFirst({
            where: { product_id: item.product_id },
          });
          if (product) {
            await this.model.product.update({
              where: { product_id: item.product_id },
              data: {
                quantity: product.quantity - item.quantity,
              },
            });
          }
        }),
      );

      // Send confirmation email
      if (email_user?.email) {
        await this.sendEmailService.sendPaymentConfirmationEmail(
          email_user.email,
          totalAmount,
          'USD',
          `CASH-${order.order_id}`,
          cartItems.map((item) => ({
            name: item.product.product_name,
            quantity: item.quantity,
          })),
          {
            name: createPaymentDto.name,
            phone: createPaymentDto.phone,
            address: createPaymentDto.shippingAddress,
          },
        );
      }

      return {
        status: 200,
        message: 'Cash payment order created successfully',
        orderId: order.order_id,
      };
    } catch (error) {
      console.error('Error creating cash payment:', error);
      throw error;
    }
  }

  verifyWebhook(rawBody: Buffer, signature: string): Stripe.Event {
    const endpointSecret = process.env.ENDPOINTSECRET;
    return this.stripe.webhooks.constructEvent(
      rawBody,
      signature,
      endpointSecret,
    );
  }

  async handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
    console.log('paymentIntent', paymentIntent);
  }
  async handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    try {
      const accountId = session.metadata?.account_id;
      if (!accountId) {
        throw new Error('Account ID is missing from metadata');
      }
      // lấy địa chỉ
      const shippingDetails = session.shipping_details;
      if (!shippingDetails) {
        throw new Error('Shipping details not found in the session');
      }
      const shippingAddress = {
        name: shippingDetails.name,
        phone: shippingDetails.phone,
        address: `${shippingDetails.address.line1}, ${shippingDetails.address.line2 ? shippingDetails.address.line2 + ', ' : ''}${shippingDetails.address.city}, ${shippingDetails.address.state} ${shippingDetails.address.postal_code}, ${shippingDetails.address.country}`,
      };
      // Lấy line items từ session
      const lineItems = await this.stripe.checkout.sessions.listLineItems(
        session.id,
        { limit: 100 },
      );
      const order = await this.model.order.create({
        data: {
          account_id: parseInt(accountId),
          stripe_session_id: session.id,
          total_price: session.amount_total / 100,
          payment_status: 'completed',
          shipping_address: shippingAddress.address,
        },
      });
      // Lưu các sản phẩm đã mua vào đơn hàng
      const orderItems = await Promise.all(
        lineItems.data.map(async (item) => {
          const product = await this.model.product.findFirst({
            where: { product_name: item.description },
          });
          if (!product) {
            throw new Error(`Product not found for item: ${item.description}`);
          }
          return {
            order_id: order.order_id,
            product_id: product.product_id,
            quantity: item.quantity,
            price: item.amount_total / 100,
          };
        }),
      );
      // Lưu các sản phẩm vào bảng order_item
      await this.model.order_item.createMany({
        data: orderItems,
      });

      // Lấy email người dùng để gửi thông báo xác nhận thanh toán
      const emailUser = await this.model.account.findUnique({
        where: { account_id: Number(accountId) },
      });

      if (!emailUser || !emailUser.email) {
        throw new Error('User email not found');
      }
      // Lấy danh sách sản phẩm  để gửi trong email
      const products = lineItems.data.map((item) => ({
        name: item.description,
        quantity: item.quantity,
      }));
      await this.model.cart.deleteMany({
        where: {
          account_id: Number(accountId),
        },
      });
      // cập nhật lại số lượng product vs sp đã bán
      await Promise.all(
        orderItems.map(async (item) => {
          const product = await this.model.product.findFirst({
            where: { product_id: item.product_id },
          });
          if (!product) {
            throw new Error(`Product not found for item: ${item.product_id}`);
          }
          await this.model.product.update({
            where: { product_id: item.product_id },
            data: {
              quantity: product.quantity - item.quantity,
            },
          });
        }),
      );
      // Gửi email xác nhận thanh toán kèm thông tin sản phẩm
      await this.sendEmailService.sendPaymentConfirmationEmail(
        emailUser.email,
        session.amount_total / 100,
        session.currency.toUpperCase(),
        session.id,
        products,
        shippingAddress,
      );
    } catch (err) {
      console.error(
        `Error handling checkout session completed: ${err.message}`,
      );
    }
  }
}
