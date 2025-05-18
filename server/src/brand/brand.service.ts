import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateBrandDTO } from './dto/create-brand.dto';
import { UpdateBrandDTO } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
  model = new PrismaClient();

  async getAllBrand() {
    return await this.model.brand.findMany();
  }

  async getBrandById(id: number) {
    const existingBrand = await this.model.brand.findFirst({
      where: { brand_id: Number(id) },
    });
    if (!existingBrand) {
      throw new HttpException(
        {
          statusCode: 500,
          message: 'ID thương hiệu bạn tìm kiếm không tồn tại.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return existingBrand;
  }

  async getBrandByName(name: string) {
    const existingBrand = await this.model.brand.findFirst({
      where: { brand_name: name },
    });
    if (!existingBrand) {
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Tên thương hiệu bạn kiếm không tồn tại.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return existingBrand;
  }

  async createBrand(data: CreateBrandDTO) {
    // Kiểm tra xem tên thương hiệu đã tồn tại chưa
    const existingBrand = await this.model.brand.findFirst({
      where: { brand_name: data.brandName },
    });
    if (existingBrand) {
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Tên thương hiệu đã tồn tại. Không thể thêm mới.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return await this.model.brand.create({
      data: {
        brand_name: data.brandName,
      },
    });
  }

  async updateBrand(data: UpdateBrandDTO, id: number) {
    const existingBrand = await this.model.brand.findFirst({
      where: { brand_id: Number(id) },
    });
    if (!existingBrand) {
      throw new HttpException(
        {
          statusCode: 500,
          message: ' Thương hiệu không tồn tại. Không thể cập nhật.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    // check tên thương hiệu đã tồn tại chưa
    const brandWithSameName = await this.model.brand.findFirst({
      where: { brand_name: data.brandName },
    });
    if (brandWithSameName && brandWithSameName.brand_id !== id) {
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Tên thương hiệu đã tồn tại. Không thể cập nhật.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return await this.model.brand.update({
      where: { brand_id: Number(id) },
      data: {
        brand_name: data.brandName,
      },
    });
  }

  async deleteBrand(id: number) {
    const existingBrand = await this.model.brand.findFirst({
      where: { brand_id: Number(id) },
    });
    if (!existingBrand) {
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Thương hiệu không tồn tại. Không thể xóa.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return await this.model.brand.delete({
      where: { brand_id: Number(id) },
    });
  }
}
