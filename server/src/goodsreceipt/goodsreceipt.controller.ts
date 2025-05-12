import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Get, Param, Put, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/account/decorator/currentUser.decorator';
import { RolesGuard } from 'src/guartd/role.auth';
import { CreateGoodsreceipt } from './dto/createGoodsreceipt.dto';
import { UpdategoodReceipt } from './dto/updateGoodsreceipt.dto';
import { GoodsreceiptService } from './goodsreceipt.service';

@ApiTags('Goodsreceipt')
@Controller('goodsreceipt')
@ApiBearerAuth()
export class GoodsreceiptController {
  constructor(private readonly goodsreceiptService: GoodsreceiptService) {}

  @UseGuards(new RolesGuard(['1']))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(201)
  @Get('getAllGoodsreceipt')
  getAllGoodsreceipt() {
    return this.goodsreceiptService.getAllGoodsreceipt();
  }

  @UseGuards(new RolesGuard(['1']))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(201)
  @Post('createGoodsreceipt')
  createGoodsreceipt(
    @Body() dto: CreateGoodsreceipt,
    @CurrentUser() currentUser,
  ) {
    const account_id = currentUser.data.account_id;
    return this.goodsreceiptService.createGoodsreceipt(dto, account_id);
  }
  @UseGuards(new RolesGuard(['1']))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(201)
  @Put('updateGoodsreceipt/:id')
  updateGoodsreceipt(@Param('id') id: number, @Body() dto: UpdategoodReceipt) {
    return this.goodsreceiptService.updateGoodsreceipt(dto, id);
  }
}
