import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guartd/role.auth';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/create-category.dto';

@ApiTags('Category')
@Controller('category')
@ApiBearerAuth()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/get-all-category')
  @HttpCode(200)
  getAllCategory() {
    return this.categoryService.getAllCategory();
  }
  @Get('/get-category/:id')
  @HttpCode(200)
  getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getCategoryById(id);
  }

  @UseGuards(new RolesGuard(['1']))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Post('/create-category')
  createCategory(@Body() data: CreateCategoryDTO) {
    return this.categoryService.createCategory(data);
  }
}
