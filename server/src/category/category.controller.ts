import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guartd/role.auth';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/updateCategory.dto';

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

  @Get('/get-category-by-name/:name')
  @HttpCode(200)
  getCategoryByName(@Param('name') name: string) {
    console.log(name);
    return this.categoryService.getCategoryByName(name);
  }

  @UseGuards(new RolesGuard(['1']))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Post('/create-category')
  createCategory(@Body() data: CreateCategoryDTO) {
    return this.categoryService.createCategory(data);
  }

  @UseGuards(new RolesGuard(['1']))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Put('/update-category/:id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCategoryDTO,
  ) {
    return this.categoryService.updateCategory(id, data);
  }

  @UseGuards(new RolesGuard(['1']))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Delete('/delete-category/:id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
