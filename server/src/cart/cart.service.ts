import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CartService {

    model = new PrismaClient();
    async delProductToCart(account_id: number, product_id: number) {
        await this.model.cart.delete({
            where: {
                account_id_product_id: {
                    account_id,
                    product_id,
                },
            },
        });
        return { status: 200, message: "Product deleted from cart" };
    }

    async addProductToCart(accountId: number, productId: number, quantity: number) {
        const product = await this.model.product.findUnique({
            where: {
                product_id: productId,
            },
        });
        if (!product) {
            throw new Error("Product not found");
        }
        const existingCartItem = await this.model.cart.findUnique({
            where: {
                account_id_product_id: {
                    account_id: accountId,
                    product_id: productId,
                },
            },
        });

        if (existingCartItem) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
            const updatedCartItem = await this.model.cart.update({
                where: {
                    account_id_product_id: {
                        account_id: accountId,
                        product_id: productId,
                    },
                },
                data: {
                    quantity: existingCartItem.quantity + quantity,
                    price: product.output_price,
                },
            });
            return { status: 200, message: "Product updated in cart", data: updatedCartItem };
        } else {
            // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
            const newCartItem = await this.model.cart.create({
                data: {
                    account_id: accountId,
                    product_id: productId,
                    quantity: quantity,
                    price: product.output_price,
                },
            });
            return { status: 200, message: "Product added to cart", data: newCartItem };
        }
    }
    async getAllItemsCart(account_id: number) {
        return await this.model.cart.findMany({
            where: {
                account_id
            },
            include: {
                product: true,
            },
        });
    }
    async clearItemsFromCart(account_id: number) {
        await this.model.cart.deleteMany({
            where: {
                account_id: account_id,
            },
        });
        return { status: 200, message: "All products removed from cart" };
    }
    async changeQuantity(account_id: number, product_id: number, action: 'increment' | 'decrement') {
        const cartItem = await this.model.cart.findUnique({
            where: {
                account_id_product_id: {
                    account_id,
                    product_id,
                },
            },
        });
        if (!cartItem) {
            throw new Error(`Product with ID ${product_id} not found in cart`);
        };
        let newQuantity =
            action === 'increment'
                ? cartItem.quantity + 1
                : cartItem.quantity - 1;

        if (newQuantity < 1) {
            throw new Error(`Quantity cannot be less than 1`);
        };
        const updatedCartItem = await this.model.cart.update({
            where: {
                account_id_product_id: {
                    account_id,
                    product_id,
                },
            },
            data: {
                quantity: newQuantity,
            },
        });
        return {
            status: 200,
            message: 'Quantity updated successfully',
            data: updatedCartItem,
        };
    }
}


