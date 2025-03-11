import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { customer, PrismaClient } from '@prisma/client';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  model = new PrismaClient();
  async create(createCustomerDto: CreateCustomerDto):Promise<customer> {
    return await this.model.customer.create({
      data: createCustomerDto
    });
  }

  async findAll(name: string):Promise<customer[]> {
    return await this.model.customer.findMany({
      where: {
        customer_name: {
          contains: name // LIKE '%name%'
        }
      }
    })
  }

  async findOne(id: number):Promise<customer>{
    return await this.model.customer.findUnique({
      where: {
        customer_id: id,
      }
    })
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    let existCusId = await this.model.customer.findUnique({
      where: {
        customer_id: id,
      }
    });
    if (!existCusId) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    return await this.model.customer.update({
      where: { customer_id: id },
      data: updateCustomerDto
    });
  }

  async remove(id: number) {
    let existCusId = await this.model.customer.findUnique({
      where: {
        customer_id: id,
      }
    });
    if (!existCusId) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    };
    return await this.model.customer.delete({
      where: { customer_id: id }
    });
  }
}
