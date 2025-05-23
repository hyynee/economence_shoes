import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/services/mail.services';
import { v4 as uuidv4 } from 'uuid';
import { AccountLoginDTO } from './dto/auth.dto';
import { SignUpType } from './entities/auth.entities';
@Injectable()
export class AuthService {
  model = new PrismaClient();
  constructor(
    private jwtService: JwtService,
    private sendEmailService: MailService,
  ) {}

  async login(body: AccountLoginDTO) {
    let { email, password } = body;
    // check email trùng
    let checkEmail = await this.model.account.findFirst({
      where: {
        email,
      },
    });
    // console.log("email", checkEmail)
    if (checkEmail) {
      let checkPass = bcrypt.compareSync(password, checkEmail.password);
      // console.log("check",checkPass)
      if (checkPass == true) {
        let token = this.jwtService.sign(
          { data: checkEmail },
          { expiresIn: '3h', secret: 'NODE' },
        );
        // console.log("token" + token);
        return { message: 'Login thành công', status: 200, email, token };
      } else {
        return { message: 'Sai mật khẩu', status: 400 };
      }
    } else {
      return { message: 'Email không tồn tại', status: 400 };
    }
  }

  async signup(body: SignUpType) {
    try {
      let { full_name, email, password, role_id } = body;
      role_id = role_id || '2';
      let checkEmail = await this.model.account.findMany({
        where: {
          email: email,
        },
      });
      if (checkEmail.length > 0) {
        throw new Error('Email đã tồn tại');
      }

      let newData = {
        full_name,
        email,
        password: bcrypt.hashSync(password, 10),
        role_id,
      };

      console.log('newData', newData);
      await this.model.account.create({ data: newData });
      return { success: true, message: 'Đăng ký thành công' };
    } catch (exp) {
      console.error('Đã xảy ra lỗi:', exp);
      return {
        success: false,
        message: exp.message || 'Đã xảy ra lỗi, vui lòng thử lại sau.',
      };
    }
  }

  async changePassword(CurrentUser, oldPassword: string, newPassword: string) {
    const user = await this.model.account.findFirst({
      where: {
        account_id: CurrentUser.data.account_id,
      },
    });
    console.log('userID', CurrentUser.data.account_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      throw new BadRequestException('Mật khẩu cũ không đúng!');
    }
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newHashedPassword;
    return await this.model.account.update({
      where: {
        account_id: CurrentUser.data.account_id,
      },
      data: {
        password: newHashedPassword,
      },
    });
  }

  async forgotPassword(email: string) {
    const user = await this.model.account.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      const resetToken = uuidv4();
      await this.model.resetToken.create({
        data: {
          token: resetToken,
          userId: user.account_id,
          expiryDate: new Date(Date.now() + 3600000),
        },
      });
      // Gửi liên kết qua email
      this.sendEmailService.sendPasswordResetEmail(email, resetToken);
      console.log('email', email);
      console.log('token', resetToken);
    }
    return { message: 'If this user exists, they will receive an email ' };
  }

  async resetPassword(newPassword: string, resetToken: string) {
    try {
      const token = await this.model.resetToken.findFirst({
        where: {
          token: resetToken,
          expiryDate: new Date(Date.now() + 3600000),
        },
      });
      // Khi nào BE lưu token thì ms dùng để ktr và đặt lại
      {
        /* 
                 if (!token) {
                 throw new UnauthorizedException("Invalid Link");
             }
            */
      }
      const user = await this.model.account.findFirst({
        where: {
          account_id: token.userId,
        },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (new Date(token.expiryDate) < new Date()) {
        throw new UnauthorizedException('Token has expired');
      }
      user.password = await bcrypt.hash(newPassword, 10);
      await this.model.account.update({
        where: {
          account_id: user.account_id,
        },
        data: {
          password: user.password,
        },
      });
      return { message: 'Password has been reset successfully' };
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      return { message: 'Password reset failed. Please try again later.' };
    }
  }
}
