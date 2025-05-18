import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  product_id: number;
  @ApiProperty()
  category_id: number;
  @ApiProperty()
  brand_id: number;
  @ApiProperty()
  product_name: string;
  @ApiProperty()
  output_price: number;
  @ApiProperty()
  country: string;
  @ApiProperty()
  year_of_product: number;
  @ApiProperty()
  discount_percent: number;
  @ApiProperty()
  image_path: string;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  input_price: number;
}
