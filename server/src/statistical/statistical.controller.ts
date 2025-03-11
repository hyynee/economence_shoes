import { Controller, Get } from '@nestjs/common';
import { HttpCode, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guartd/role.auth';
import { StatisticalService } from './statistical.service';
@Controller('statistical')
@ApiTags("Statistical")
@ApiBearerAuth()
export class StatisticalController {
  constructor(private readonly statisticalService: StatisticalService) { }

  @UseGuards(new RolesGuard(["1"]))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Get('/getTotalDeliveredOrdersPrice')
  // tổng doanh thu đơn hành đã duyệt 
  getTotalDeliveredOrdersPrice() {
    return this.statisticalService.getTotalDeliveredOrdersPrice();
  }

  @UseGuards(new RolesGuard(["1"]))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Get('/getBestSellingProducts')
  getBestSellingProducts() {
    return this.statisticalService.getBestSellingProducts();
  }

  @UseGuards(new RolesGuard(["1"]))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Get('/compare-revenue-cost')
  async compareRevenueAndCost() {
    return this.statisticalService.compareRevenueAndCost();
  }
}
