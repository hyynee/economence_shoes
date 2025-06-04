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
          select: {
            account_id: true,
            full_name: true,
            email: true,
          },
        },
        order_items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        order_date: 'desc',
      },
    });
  }
  async getOrderWithUser(id: number) {
    return await this.model.order.findMany({
      where: {
        account_id: Number(id),
      },
      include: {
        order_items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        order_date: 'desc',
      },
    });
  }
  async getOrderById(id: number) {
    return await this.model.order.findMany({
      where: {
        order_id: Number(id),
      },
      include: {
        account: {
          select: {
            account_id: true,
            full_name: true,
            email: true,
          },
        },
        order_items: {
          include: {
            product: true,
          },
        },
      },
    });
  }
  async getOrderByStatus(status: string) {
    return await this.model.order.findMany({
      where: {
        delivery_status: {
          contains: status,
        },
      },
      include: {
        account: {
          select: {
            account_id: true,
            full_name: true,
            email: true,
          },
        },
        order_items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        order_date: 'desc',
      },
    });
  }

  async updateOrderStatus(id: number, status: UpdateOrderDto) {
    console.log(`🔍 Checking order ID: ${id}`);
    const existingOrder = await this.model.order.findUnique({
      where: {
        order_id: Number(id),
      },
    });
    if (!existingOrder) {
      throw new Error('Order not found');
    }
    console.log(`Updating order ID ${id} with status:`, status);

    // If payment_method is cash and delivery_status is being updated to delivered,
    // automatically update payment_status to completed
    const updateData: any = {
      delivery_status: status.delivery_status,
    };

    if (
      existingOrder.payment_method === 'cash' &&
      status.delivery_status === 'delivered'
    ) {
      updateData.payment_status = 'completed';
    } else if (status.payment_status) {
      updateData.payment_status = status.payment_status;
    }

    return this.model.order.update({
      where: {
        order_id: Number(id),
      },
      data: updateData,
      include: {
        account: {
          select: {
            account_id: true,
            full_name: true,
            email: true,
          },
        },
        order_items: {
          include: {
            product: true,
          },
        },
      },
    });
  }
}
