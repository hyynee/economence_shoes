import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient, product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  model = new PrismaClient();
  async getAllProducts() {
    return await this.model.product.findMany();
  }
  async getNewArrivalProducts() {
    try {
      const newArrivalProducts = await this.model.product.findMany({
        orderBy: {
          output_price: 'desc',
        },
        take: 4,
      });
      return newArrivalProducts;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Đã xảy ra lỗi, vui lòng thử lại sau.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getBestSellingProduct() {
    const [bestSellingProducts, products] = await Promise.all([
      this.model.order_item.groupBy({
        by: ['product_id'],
        _sum: { quantity: true, price: true },
        orderBy: { _sum: { quantity: 'desc' } },
        take: 1,
      }),
      this.model.product.findMany({
        select: {
          product_id: true,
          category_id: true,
          brand_id: true,
          product_name: true,
          output_price: true,
          country: true,
          year_of_product: true,
          discount_percent: true,
          image_path: true,
          quantity: true,
        },
      }),
    ]);

    if (!bestSellingProducts) {
      throw new HttpException(
        {
          statusCode: 404,
          message: 'No best selling product found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const bestSellingProduct = bestSellingProducts[0];
    const product = products.find(
      (p) => p.product_id === bestSellingProduct.product_id,
    );
    if (!product) {
      throw new HttpException(
        {
          statusCode: 404,
          message: 'Product details not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      product_id: product.product_id,
      category_id: product.category_id,
      brand_id: product.brand_id,
      product_name: product.product_name,
      output_price: product.output_price,
      country: product.country,
      year_of_product: product.year_of_product,
      discount_percent: product.discount_percent,
      image_path: product.image_path,
      quantity: product.quantity,
    };
  }
  async getProductsByName(nameProd: string): Promise<product[]> {
    return await this.model.product.findMany({
      where: {
        product_name: {
          contains: nameProd, // LIKE '%nameProd%'
        },
      },
    });
  }
  async getProductsPage(page: number, pageSize: number): Promise<product[]> {
    return await this.model.product.findMany({
      skip: (page - 1) * pageSize,
      take: Number(pageSize),
    });
  }
  async themProduct(prod: CreateProductDto): Promise<product> {
    const existingProduct = await this.model.product.findUnique({
      where: { product_id: prod.product_id },
    });

    if (existingProduct) {
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Product_ID đã tồn tại',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return await this.model.product.create({
      data: prod,
    });
  }

  async findOne(id: number): Promise<product[]> {
    return await this.model.product.findMany({
      where: {
        product_id: id,
      },
      include: {
        category: {
          select: {
            category_name: true,
          },
        },
        brand: {
          select: {
            brand_name: true,
          },
        },
      },
    });
  }
  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<product> {
    let existingProductId = await this.model.product.findUnique({
      where: {
        product_id: id,
      },
    });
    if (!existingProductId) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return await this.model.product.update({
      where: {
        product_id: id,
      },
      data: updateProductDto,
    });
  }

  async deleteProduct(id: number) {
    try {
      const existingProduct = await this.model.product.findUnique({
        where: { product_id: id },
      });
      if (!existingProduct) {
        throw new HttpException(
          {
            statusCode: 404,
            message: `Product with ID ${id} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      await this.model.product.delete({
        where: { product_id: id },
      });
      return { message: `Product with ID ${id} has been deleted successfully` };
    } catch (exp) {
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Đã xảy ra lỗi, vui lòng thử lại sau.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
