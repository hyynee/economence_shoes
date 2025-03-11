import { Body, Controller, HttpCode, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/account/decorator/currentUser.decorator';
import { AuthService } from './auth.service';
import { AccountLoginDTO } from './dto/auth.dto';
import { ChangePassWordDto } from './dto/chanePassword.dto';
import { ForgotPassword } from './dto/ForgotPassword.dto';
import { ResetPasswordDto } from './dto/ResetPasswordDto.auth.dto';
import { SignUpType } from './entities/auth.entities';

@ApiTags("Login/SignUp")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  async login(@Body() body: AccountLoginDTO) {
    return this.authService.login(body);
  }
  @Post('/signup')
  async signup(@Body() body: SignUpType) {
    return this.authService.signup(body);
  }

  // change password@UseGuards(new RolesGuard(["1"]))
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(201)
  @Post('/changePassword')
  async changePassword(
    @Body() changePassWordDto: ChangePassWordDto,
    @CurrentUser() CurrentUser) {
    return this.authService.changePassword(
      CurrentUser,
      changePassWordDto.oldPassword,
      changePassWordDto.newPassword);
  }
  // Forgot password
  @HttpCode(201)
  @Post('/forgotPassword')
  async forgotPassword(
    @Body() forgotPassword: ForgotPassword
  ) {
    return this.authService.forgotPassword(forgotPassword.email);
  }

  // Reset password
  @HttpCode(201)
  @Put('/resetPassword')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ) { 
    return this.authService.resetPassword(
      resetPasswordDto.newPassword,
      resetPasswordDto.resetToken,
    );
  }

}
