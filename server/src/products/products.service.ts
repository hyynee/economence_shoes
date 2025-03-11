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
  async getProductsByName(nameProd: string): Promise<product[]> {
    return await this.model.product.findMany({
      where: {
        product_name: {
          contains: nameProd // LIKE '%nameProd%'
        }
      }
    });
  }
  async getProductsPage(page: number, pageSize: number): Promise<product[]> {
    return await this.model.product.findMany({
      skip: (page - 1) * pageSize,
      take: Number(pageSize)
    });
  }
  async themProduct(prod: CreateProductDto): Promise<product> {
    // console.log(prod);
    const existingProduct = await this.model.product.findUnique({
      where: { product_id: prod.product_id }
    });

    if (existingProduct) {
      throw new HttpException(
        {
          statusCode: 500,
          message: "Product_ID đã tồn tại",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    const newProductData = {
      ...prod,
      quantity: prod.quantity ?? 1,
    };

    // Thêm sản phẩm mới
    return await this.model.product.create({
      data: newProductData,
    });
  }


  async findOne(id: number): Promise<product[]> {
    return await this.model.product.findMany({
      where: {
        product_id: id
      },
      include: {
        category: {
          select: {
            category_name: true
          }
        },
        brand: {
          select: {
            brand_name: true
          }
        }
      }
    });
  }
  async update(id: number, updateProductDto: UpdateProductDto): Promise<product> {
    let existingProductId = await this.model.product.findUnique({
      where: {
        product_id: id,
      }
    });
    if (!existingProductId) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return await this.model.product.update({
      where: {
        product_id: id,
      },
      data: updateProductDto
    })

  }

  async deleteProduct(id: number) {
    try {
      const existingProduct = await this.model.product.findUnique({
        where: { product_id: id }
      });
      if (!existingProduct) {
        throw new HttpException(
          {
            statusCode: 404,
            message: `Product with ID ${id} not found`,
          },
          HttpStatus.NOT_FOUND
        );
      }
      await this.model.product.delete({
        where: { product_id: id }
      });
      return { message: `Product with ID ${id} has been deleted successfully` };
    } catch (exp) {
      throw new HttpException(
        {
          statusCode: 500,
          message: "Đã xảy ra lỗi, vui lòng thử lại sau.",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

}
