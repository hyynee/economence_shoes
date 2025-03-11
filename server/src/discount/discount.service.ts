import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { discount, PrismaClient } from '@prisma/client';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

@Injectable()
export class DiscountService {
  model = new PrismaClient();
  async createDiscount(createDiscountDto: CreateDiscountDto): Promise<discount> {
    // Check for existing discount code
    const existDisID = await this.model.discount.findUnique({
        where: {
            discount_code: createDiscountDto.discount_code,
        }
    });
    if (existDisID) {
        throw new HttpException(
            {
                statusCode: 500,
                message: "ID đã tồn tại",
            },
            HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
    // Function to convert date from DD-MM-YYYY to YYYY-MM-DD
    const convertDateFormat = (dateString: string): string => {
        const parts = dateString.split('-');
        return `${parts[2]}-${parts[1]}-${parts[0]}`; // YYYY-MM-DD
    };
    // Convert dates to ISO-8601 format
    const startDate = new Date(convertDateFormat(createDiscountDto.start_date)).toISOString();
    const endDate = new Date(convertDateFormat(createDiscountDto.end_date)).toISOString();
    // Check for valid date
    if (isNaN(new Date(startDate).getTime()) || isNaN(new Date(endDate).getTime())) {
        throw new HttpException(
            {
                statusCode: 400,
                message: "Ngày không hợp lệ",
            },
            HttpStatus.BAD_REQUEST
        );
    }
    // Create new discount
    return await this.model.discount.create({
        data: {
            ...createDiscountDto,
            start_date: startDate,
            end_date: endDate,
        },
    });
}



  getAllDiscount() {
    return this.model.discount.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} discount`;
  }

  update(id: number, updateDiscountDto: UpdateDiscountDto) {
    return `This action updates a #${id} discount`;
  }

  remove(id: number) {
    return `This action removes a #${id} discount`;
  }
}
