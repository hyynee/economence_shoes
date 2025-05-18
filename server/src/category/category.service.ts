import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCategoryDTO } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  model = new PrismaClient();
  async getAllCategory() {
    return await this.model.category.findMany();
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
}
