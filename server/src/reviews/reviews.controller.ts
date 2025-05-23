import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/account/decorator/currentUser.decorator';
import { CreateReviewDto } from './dto/create-reviews.dto';
import { UpdateReviewDto } from './dto/update-reviews.dto';
import { ReviewsService } from './reviews.service';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('getAllComment')
  findAll() {
    return this.reviewsService.findAll();
  }
  @Get('getAllCommentByProductId/:productId')
  findAllByProductId(@Param('productId', ParseIntPipe) productId: number) {
    return this.reviewsService.findAllByProductId(productId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('createComment/:product_id')
  createComment(
    @CurrentUser() currentUser,
    @Param('product_id', ParseIntPipe) product_id: number,
    @Body() data: CreateReviewDto,
  ) {
    const account_id = currentUser.data.account_id;
    return this.reviewsService.createComment(account_id, product_id, data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('updateComment/:product_id')
  updateComment(
    @CurrentUser() currentUser,
    @Param('product_id', ParseIntPipe) product_id: number,
    @Body() data: UpdateReviewDto,
  ) {
    const account_id = currentUser.data.account_id;
    return this.reviewsService.updateComment(account_id, product_id, data);
  }
}
