import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, UseGuards, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { customer } from '@prisma/client';
import { RolesGuard } from 'src/guartd/role.auth';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';


@ApiTags("Customer")
@Controller('customer')
@ApiBearerAuth()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(new RolesGuard(["1"]))
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(201)
  @Post("/create-customer")
  create(@Body() createCustomerDto: CreateCustomerDto):Promise<customer> {
    return this.customerService.create(createCustomerDto);
  }


  @UseGuards(new RolesGuard(["1"]))
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(201)
  @Get("/getCustomerByName/:name")
  findAll(@Param("name") name: string):Promise<customer[]> {
    return this.customerService.findAll(name);
  }


  @UseGuards(new RolesGuard(["1"]))
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(201)
  @Get('/getCustomerById/:id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.customerService.findOne(id);
  }

  @UseGuards(new RolesGuard(["1"]))
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(201)
  @Put('/updateCus/:id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @UseGuards(new RolesGuard(["1"]))
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(201)
  @Delete('/delCusById/:id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.customerService.remove(id);
  }
}
