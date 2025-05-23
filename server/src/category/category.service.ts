import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/updateCategory.dto';

@Injectable()
export class CategoryService {
  model = new PrismaClient();
  async getAllCategory() {
    return await this.model.category.findMany();
  }

  async getCategoryByName(name: string) {
    console.log('name', name);
    const existingCategory = await this.model.category.findFirst({
      where: { category_name: name },
    });
    if (!existingCategory) {
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Tên danh mục bạn kiếm không tồn tại.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return existingCategory;
  }

  async getCategoryById(id: number) {
    return await this.model.category.findUnique({
      where: {
        category_id: id,
      },
    });
  }

  async createCategory(data: CreateCategoryDTO) {
    return await this.model.category.create({
      data: {
        category_name: data.categoryName,
      },
    });
  }

  async updateCategory(id: number, data: UpdateCategoryDTO) {
    const exitsId = await this.model.category.findUnique({
      where: {
        category_id: id,
      },
    });
    if (!exitsId) {
      throw new HttpException(
        {
          statusCode: 500,
          message: 'ID category không tồn tại.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return await this.model.category.update({
      where: {
        category_id: id,
      },
      data: {
        category_name: data.categoryName,
      },
    });
  }

  async deleteCategory(id: number) {
    return await this.model.category.delete({
      where: {
        category_id: id,
      },
    });
  }
}
