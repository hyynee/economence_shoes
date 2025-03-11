import { Injectable, Request } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { account, PrismaClient } from '@prisma/client';
import { Permission } from 'src/helpers/checkPermission.helper';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  model = new PrismaClient();
  async getAllUser() {
    return await this.model.account.findMany()
  }

  async getUserByName(nameUser: string): Promise<account[]> {
    return await this.model.account.findMany({
      where: {
        full_name: {
          contains: nameUser
        },
      },
    });
  }
  async getCurrentUser(@Request() req) {
    return req.currentUser;
  }


  async getUserByID(id: number) {
    return `This action returns a #${id} account`;
  }

  async updateUserByID(id: number, reqBody: UpdateAccountDto, currentUser) {
    let user = await this.model.account.findFirst({
      where: {
        account_id: id,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    // check id
    Permission.check(id, currentUser)
    user = { ...user, ...reqBody };
    return await this.model.account.update({
      where: {
        account_id: id,
      },
      data: {
        ...reqBody,
      },
    });
  }

  async deleteAccountByID(id: number) {
    try {
      const existingAccount = await this.model.account.findUnique({
        where: {
          account_id: id
        }
      });
      if (!existingAccount) {
        throw new Error('Account not found');
      }
      // nếu tồn tại xóa tk đó đi
      await this.model.account.delete({
        where: {
          account_id: id,
        },
      });
      return { message: `Account with ID ${id} has been deleted successfully` };
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
