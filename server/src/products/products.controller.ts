import { Body, Controller, Delete, Get, Headers, HttpCode, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { product } from '@prisma/client';
import { diskStorage } from 'multer';
import { RolesGuard } from 'src/guartd/role.auth';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileUploadDTO } from './dto/UploadProducts.dto';
import { ProductsService } from './products.service';

@ApiTags("Products")
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }


  @HttpCode(201)
  @Get('/getAllProducts')
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @HttpCode(201)
  @Get('/getProductsById/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }
  @HttpCode(201)
  @Get('/getProductsByName/:nameProd')
  getProductsByName(@Param("nameProd") nameProd: string): Promise<product[]> {
    return this.productsService.getProductsByName(nameProd);
  }

  @HttpCode(201)
  @Get('/getProductsPage/:page/:pageSize')
  getProductsPage(@Param("page") page: number, @Param("pageSize") pageSize: number): Promise<product[]> {
    return this.productsService.getProductsPage(page, pageSize);
  }
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDTO })
  @Post("/upLoadImage")
  @UseInterceptors(FileInterceptor("image", // key của FE gởi lên
    { // nơi định nghĩa lại name
      storage: diskStorage({
        destination: process.cwd() + "/public/img",
        filename: (req, file, cb) => cb(null, new Date().getTime() + "_" + file.originalname)
      })

    }))
  uploadProd(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  @ApiBearerAuth()
  @UseGuards(new RolesGuard(["1"]))
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(201)
  @Post('/themSanPham')
  themProduct(@Headers("token") header, @Body() prod: CreateProductDto): Promise<product> {
    return this.productsService.themProduct(prod);
  }

  @ApiBearerAuth()
  @UseGuards(new RolesGuard(["1"]))
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(201)
  @Put("/updateProductById/:id")
  updateProduct(@Param('id', ParseIntPipe) id: number, @Body() prod: UpdateProductDto): Promise<product> {
    return this.productsService.update(id, prod);
  }

  @ApiBearerAuth()
  @UseGuards(new RolesGuard(["1"]))
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(201)
  @Delete('/deleteProduct/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.deleteProduct(id);
  }
}
