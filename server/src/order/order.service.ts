import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateOrderDto } from './dto/update.order.dto';

@Injectable()
export class OrderService {
    model = new PrismaClient();
    async getAllOrder() {
        return await this.model.order.findMany({
            include: {
                account: {
                    select: { full_name: true, email: true }
                }
            }
        });
    }
    async getOrderWithUser(id: number) {
        return await this.model.order.findMany({
            where: {
                account_id: Number(id)
            },
            include: {
                order_items: {
                    include: {
                        product: true
                    }
                }
            }
        });
    }
    async getOrderById(id: number) {
        return await this.model.order.findMany({
            where: {
                order_id: Number(id)
            }
        });
    }
    async getOrderByStatus(status: string) {
        return await this.model.order.findMany({
            where: {
                delivery_status: {
                    contains: status
                }
            }
        });
    }

    async updateOrderStatus(id: number, status: UpdateOrderDto) {
        console.log(`🔍 Checking order ID: ${id}`);
        const existingOrder = await this.model.order.findUnique({
            where: {
                order_id: Number(id)
            }
        });
        if (!existingOrder) {
            throw new Error('Order not found');
        }
        console.log(`Updating order ID ${id} with status: ${status.delivery_status}`);
        return this.model.order.update({
            where: {
                order_id: Number(id)
            },
            data: {
                delivery_status: status.delivery_status
            }
        });
    }


   

}
