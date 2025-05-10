import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class StatisticalService {
  model = new PrismaClient();
  // doanh thu
  async getTotalDeliveredOrdersPrice() {
    const result = await this.model.order.aggregate({
      _sum: {
        total_price: true,
      },
      where: {
        delivery_status: 'delivered',
      },
    });
    return result._sum.total_price || 0;
  }
  async getBestSellingProducts() {
    const [bestSellingProducts, products, inputPrices] = await Promise.all([
      this.model.order_item.groupBy({
        by: ['product_id'],
        _sum: { quantity: true, price: true },
        orderBy: { _sum: { quantity: 'desc' } },
      }),
      this.model.product.findMany({
        select: { product_id: true, product_name: true },
      }),
      this.model.goodsreceipt_detail.groupBy({
        by: ['product_id'],
        _avg: { input_price: true },
      }),
    ]);
    const productMap = new Map(
      products.map((prod) => [prod.product_id, prod.product_name]),
    );
    const inputPriceMap = new Map(
      inputPrices.map((item) => [item.product_id, item._avg?.input_price ?? 0]),
    );
    return bestSellingProducts.map((item) => ({
      product_id: item.product_id,
      product_name: productMap.get(item.product_id) || 'Unknown',
      total_quantity_sold: item._sum.quantity || 0,
      total_revenue: item._sum.price || 0,
      total_cost: item._sum.quantity * inputPriceMap.get(item.product_id) || 0,
    }));
  }
  // tổng giá nhập hàng
  async getTotalInputCost() {
    const result = await this.model.goodsreceipt_detail.aggregate({
      _sum: {
        input_price: true,
      },
    });
    return result._sum.input_price || 0;
  }
  async compareRevenueAndCost() {
    const [totalRevenue, totalInputCost] = await Promise.all([
      this.getTotalDeliveredOrdersPrice(),
      this.getTotalInputCost(),
    ]);
    return {
      total_revenue: totalRevenue,
      total_input_cost: totalInputCost,
      profit: totalRevenue - totalInputCost, // Lợi nhuận
    };
  }

  // Lấy top 5 khách hàng có tổng tiền mua hàng cao nhất trong khoảng thời gian
  async getTopCustomers(startDate: Date, endDate: Date) {
    // Lấy tất cả đơn hàng trong khoảng thời gian
    const orders = await this.model.order.findMany({
      where: {
        order_date: {
          gte: startDate,
          lte: endDate,
        },
        delivery_status: 'delivered',
      },
      include: {
        account: {
          select: {
            account_id: true,
            full_name: true,
            email: true,
          },
        },
      },
    });

    // Nhóm đơn hàng theo user và tính tổng tiền
    const customerMap = new Map();
    orders.forEach((order) => {
      const accountId = order.account.account_id;
      if (!customerMap.has(accountId)) {
        customerMap.set(accountId, {
          account_id: accountId,
          name: order.account.full_name,
          email: order.account.email,
          totalSpent: 0,
          orders: [],
        });
      }
      const customer = customerMap.get(accountId);
      customer.totalSpent += order.total_price;
      customer.orders.push({
        id: order.order_id,
        date: order.order_date,
        total: order.total_price,
      });
    });

    // Chuyển Map thành Array và sắp xếp theo tổng tiền
    const customers = Array.from(customerMap.values())
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 5); // Lấy top 5

    return customers;
  }
}
