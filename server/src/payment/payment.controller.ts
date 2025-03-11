import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, Headers, Put, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { Req, Res } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/account/decorator/currentUser.decorator';
import Stripe from 'stripe';
import { PaymentService } from './payment.service';


@ApiTags('Payments')
@Controller('payments')
@ApiBearerAuth()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuard("jwt"))
  @HttpCode(201)
  @Post('/create-checkout-session')
  create( @CurrentUser() currentUser,@Body() createPaymentDto: any) {
    const account_id = currentUser.data.account_id;
    return this.paymentService.create(account_id,createPaymentDto);
  }
  
  @Post('/webhook')
  async handleWebhook(
    @Headers('stripe-signature') signature: string, // Lấy Stripe signature từ header
    @CurrentUser() currentUser,
    @Req() req: any, 
    @Res() res: any, 
  ) {
    let event: Stripe.Event;

    try {
      // Sử dụng raw body và signature để xác minh webhook
      event = this.paymentService.verifyWebhook(req.body, signature);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(HttpStatus.BAD_REQUEST).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await this.paymentService.handlePaymentIntentSucceeded(paymentIntent);
        break;
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        await this.paymentService.handleCheckoutSessionCompleted(session);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Xác nhận Stripe đã gửi webhook thành công
    return res.status(HttpStatus.OK).send({ received: true });
  }
}
