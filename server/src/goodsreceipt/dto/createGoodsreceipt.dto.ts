import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateGoodsreceiptDetail {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  product_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  input_price: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  product_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  category_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  brand_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  output_price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  year_of_product: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  discount_percent: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image_path: string;
}

export class CreateGoodsreceipt {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  goodsreceipt_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  total_price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  supplier_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  account_id: number;

  @ApiProperty({ type: [CreateGoodsreceiptDetail] })
  @ValidateNested({ each: true })
  @Type(() => CreateGoodsreceiptDetail)
  goodsreceipt_detail: CreateGoodsreceiptDetail[];
}
