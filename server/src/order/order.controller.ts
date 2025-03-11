import { Controller, Get, ParseIntPipe } from '@nestjs/common';
import { Body, HttpCode, Param, Put, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { order } from '@prisma/client';
import { CurrentUser } from 'src/account/decorator/currentUser.decorator';
import { RolesGuard } from 'src/guartd/role.auth';
import { UpdateOrderDto } from './dto/update.order.dto';
import { OrderService } from './order.service';


@ApiTags("Order")
@Controller('order')
@ApiBearerAuth()
export class OrderController {
  constructor(private readonly orderService: OrderService) { }


  @UseGuards(new RolesGuard(["1"]))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(201)
  @Get('/getAllOrder')
  getAllOrder() {
    return this.orderService.getAllOrder();
  }
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(201)
  @Get('/getOrderWithUser')
  getOrderWithUser(@CurrentUser() currentUser) {
    const account_id = currentUser.data.account_id;
    return this.orderService.getOrderWithUser(account_id);
  }
  @UseGuards(new RolesGuard(["1"]))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Get('/getOrderById/:id')
  getOrderById(@Param('id') id: number): Promise<order[]> {
    return this.orderService.getOrderById(id);
  }

  @UseGuards(new RolesGuard(["1"]))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Get('/getOrderByStatus/:status')
  getOrderByStatus(@Param('status') status: string): Promise<order[]> {
    return this.orderService.getOrderByStatus(status);
  }


  @UseGuards(new RolesGuard(["1"]))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Put('/updateOrder/:id')
  updateOrderStatus(@Param('id', ParseIntPipe) id: number, @Body() status: UpdateOrderDto) {
    return this.orderService.updateOrderStatus(id, status);
  }

 
}
