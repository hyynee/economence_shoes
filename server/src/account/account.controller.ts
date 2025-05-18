import { Body, Controller, Delete, Get, Headers, HttpCode, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { account } from '@prisma/client';
import { RolesGuard } from 'src/guartd/role.auth';
import { AccountService } from './account.service';
import { CurrentUser } from './decorator/currentUser.decorator';
import { UpdateAccountDto } from './dto/update-account.dto';


@ApiTags("Account")
@Controller('account')
@ApiBearerAuth()
export class AccountController {
  constructor(private readonly accountService: AccountService) { }
  @UseGuards(new RolesGuard(["1"]))
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(201)
  @Get("/getAllUser")
  async getAllUser(@Headers("token") headers) {
    console.log(await this.accountService.getAllUser())
    return this.accountService.getAllUser();
  }
  // data info user login
  @Get('/currentUser')
  @UseGuards(AuthGuard("jwt"))
  getCurrentUser(@CurrentUser() CurrentUser) {
    // console.log("user", CurrentUser)
    return CurrentUser;
  }

  @UseGuards(new RolesGuard(["1"]))
  @UseGuards(AuthGuard("jwt"))
  @Get('/getUserByID/:id')
  getUserByID(@Param('id', ParseIntPipe) id: number) {
    return this.accountService.getUserByID(id);
  }

  @UseGuards(new RolesGuard(["1"]))
  @UseGuards(AuthGuard("jwt"))
  @Get('/getUserByName/:nameUser')
  getUserByName(@Param('nameUser') nameUser: string): Promise<account[]> {
    return this.accountService.getUserByName(nameUser);   
  }



  @Put('/updateUserByID/:id')
  @UseGuards(AuthGuard("jwt"))
  updateUserByID(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateAccountDto, @CurrentUser() currentUser) {
    return this.accountService.updateUserByID(id, body, currentUser);
  }


  @UseGuards(new RolesGuard(["1"]))
  @UseGuards(AuthGuard("jwt"))
  @Delete('/deleteAccountByID/:id')
  deleteAccountByID(@Headers("token") headers,@Param('id', ParseIntPipe) id: number) {
    return this.accountService.deleteAccountByID(id);
  }
}
