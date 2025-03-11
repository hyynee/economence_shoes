import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsPositive, IsString, ValidateNested } from "class-validator";

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
