import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateReviewDto } from './dto/create-reviews.dto';
import { UpdateReviewDto } from './dto/update-reviews.dto';

@Injectable()
export class ReviewsService {
  model = new PrismaClient();
  async findAll() {
    return this.model.reviews.findMany({
      include: {
        account: true,
        product: true,
      },
    });
  }
  async findAllByProductId(productId: number) {
    return this.model.reviews.findMany({
      where: {
        product_id: Number(productId),
      },
      include: {
        account: true,
        product: true,
      },
    });
  }
  async createComment(
    account_id: number,
    product_id: number,
    data: CreateReviewDto,
  ) {
    const existingReview = await this.model.reviews.findUnique({
      where: {
        account_id_product_id: {
          account_id: account_id,
          product_id: product_id,
        },
      },
    });

    if (existingReview) {
      throw new HttpException(
        {
          statusCode: 404,
          message: 'Người dùng đã đánh giá sản phẩm này.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return this.model.reviews.create({
      data: {
        account_id: account_id,
        product_id: product_id,
        comment: data.comment,
        rating: data.rating,
        created_at: new Date(),
      },
      include: {
        account: true,
      },
    });
  }

  async updateComment(
    account_id: number,
    product_id: number,
    data: UpdateReviewDto,
  ) {
    // Kiểm tra xem người dùng đã từng review sản phẩm này chưa
    const existingReview = await this.model.reviews.findUnique({
      where: {
        account_id_product_id: {
          account_id,
          product_id,
        },
      },
    });
    if (!existingReview) {
      throw new HttpException(
        {
          statusCode: 404,
          message: 'Người dùng chưa đánh giá sản phẩm này.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // Cập nhật lại comment, rating và updated_at
    return this.model.reviews.update({
      where: {
        account_id_product_id: {
          account_id,
          product_id,
        },
      },
      data: {
        comment: data.comment,
        rating: data.rating,
        updated_at: new Date(),
      },
    });
  }
}
