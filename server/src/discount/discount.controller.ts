import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HttpCode, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { discount } from '@prisma/client';
import { RolesGuard } from 'src/guartd/role.auth';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';


@ApiTags("Discount")
@Controller('discount')
@ApiBearerAuth()
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}


  @UseGuards(new RolesGuard(["1"]))
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(201)
  @Post("/createDiscount")
  createDiscount(@Body() createDiscountDto: CreateDiscountDto): Promise<discount> {
    return this.discountService.createDiscount(createDiscountDto);
  }

  @Get("/getAllDiscount")
  getAllDiscount() {
    return this.discountService.getAllDiscount();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discountService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscountDto: UpdateDiscountDto) {
    return this.discountService.update(+id, updateDiscountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discountService.remove(+id);
  }
}
