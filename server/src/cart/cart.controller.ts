import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, Headers, Put, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/account/decorator/currentUser.decorator';
import { CartService } from './cart.service';
import { cartDTO } from './dto/cart.dto';

@ApiTags("Cart")
@Controller('cart')
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @UseGuards(AuthGuard("jwt"))
  @HttpCode(201)
  @Get('/getAllItemsCart')
  getAllItemsCart(@CurrentUser() currentUser) {
    const account_id = currentUser.data.account_id;
    return this.cartService.getAllItemsCart(account_id);
  }

  @UseGuards(AuthGuard("jwt"))
  @HttpCode(201)
  @Post('/addProductToCart')
  addProductToCart(
    @CurrentUser() currentUser,
    @Body() prodtocart: cartDTO
  ) {
    const account_id = currentUser.data.account_id;
    const { product_id, quantity } = prodtocart;
    return this.cartService.addProductToCart(account_id, product_id, quantity);
  }
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(201)
  @Delete('/delProductToCart')
  delProductToCart(
    @CurrentUser() currentUser,
    @Body() prodtocart: { product_id: number }
  ) {
    const account_id = currentUser.data.account_id;
    return this.cartService.delProductToCart(account_id, prodtocart.product_id);
  }

  @UseGuards(AuthGuard("jwt"))
  @HttpCode(201)
  @Delete('/clearItemsFromCart')
  clearItemsFromCart(
    @CurrentUser() currentUser,
  ) {
    const account_id = currentUser.data.account_id;
    return this.cartService.clearItemsFromCart(account_id);
  }
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(200)
  @Post('/changeQuantity')
  async changeQuantity(
    @CurrentUser() currentUser,
    @Body() body: { product_id: number; action: 'increment' | 'decrement' },
  ) {
    const account_id = currentUser.data.account_id;
    const { product_id, action } = body;
    return this.cartService.changeQuantity(account_id, product_id, action);
  }

}
