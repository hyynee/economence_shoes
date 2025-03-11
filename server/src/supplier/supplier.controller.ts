
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Delete, Headers, HttpCode, Param, Put, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { supplier } from '@prisma/client';
import { RolesGuard } from 'src/guartd/role.auth';
import { CreateSupplierDTO } from './dto/create-supplier.dto';
import { UpdateSupplierDTO } from './dto/update-supplier.dto';
import { SupplierService } from './supplier.service';

@ApiTags("Supplier")
@Controller('supplier')
@ApiBearerAuth()

export class SupplierController {
  constructor(private readonly supplierService: SupplierService) { }

  @UseGuards(new RolesGuard(["1"]))
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(201)
  @Get("/getAllSupplier")
  getAllSupplier() {
    return this.supplierService.getAllSupplier();
  }

  @UseGuards(new RolesGuard(["1"]))
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(201)
  @Get("/getSupplierById/:id")
  getSupplierById(@Param("id") id: number) {
    return this.supplierService.getSupplierById(id);
  }
  @UseGuards(new RolesGuard(["1"]))
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(201)
  @Get("/getSupplierByName/:name")
  getSupplierByName(@Param('name') name: string): Promise<supplier[]> {
    return this.supplierService.getSupplierByName(name);
  }

  @UseGuards(new RolesGuard(["1"]))
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(201)
  @Post("/createSupplier")
  async createSupplier(@Headers("token") header, @Body() sup: CreateSupplierDTO): Promise<supplier> {
    return this.supplierService.createSupplier(sup);
  }

  @UseGuards(new RolesGuard(["1"]))
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(201)
  @Put("/updateSupplier/:id")
  async updateSupplier(@Param("id") id: number, @Body() sup: UpdateSupplierDTO): Promise<supplier> {
    return this.supplierService.updateSupplier(id, sup);
  }


  @UseGuards(new RolesGuard(["1"]))
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(201)
  @Delete("/deleteSupplier/:id")
  async deleteSupplier(@Param("id") id: number): Promise<supplier> {
    return this.supplierService.deleteSupplier(id);
  }

}
