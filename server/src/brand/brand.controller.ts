import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guartd/role.auth';
import { BrandService } from './brand.service';
import { CreateBrandDTO } from './dto/create-brand.dto';

@ApiTags('Brand')
@Controller('brand')
@ApiBearerAuth()
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @HttpCode(201)
  @Get('get-all-brand')
  getAllBrand() {
    return this.brandService.getAllBrand();
  }

  @HttpCode(201)
  @Get('get-brand-by-id/:id')
  getBrandById(@Param('id') id: number) {
    return this.brandService.getBrandById(id);
  }

  @HttpCode(201)
  @Get('get-brand-by-name/:name')
  getBrandByName(@Param('name') name: string) {
    return this.brandService.getBrandByName(name);
  }

  @UseGuards(new RolesGuard(['1']))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(201)
  @Post('/create-brand')
  createBrand(@Body() data: CreateBrandDTO) {
    return this.brandService.createBrand(data);
  }

  @UseGuards(new RolesGuard(['1']))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(201)
  @Put('/update-brand/:id')
  updateBrand(@Body() data: CreateBrandDTO, @Param('id') id: number) {
    return this.brandService.updateBrand(data, id);
  }

  @UseGuards(new RolesGuard(['1']))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(201)
  @Delete('/delete-brand/:id')
  deleteBrand(@Param('id') id: number) {
    return this.brandService.deleteBrand(id);
  }
}
