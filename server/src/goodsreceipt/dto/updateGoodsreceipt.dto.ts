import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsPositive, IsString, ValidateNested } from "class-validator";

export class UpdateGoodsreceiptDetail {
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

export class UpdategoodReceipt {
    @IsNotEmpty()
    @IsInt()
    receipt_id: number;
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

    @ApiProperty({ type: [UpdateGoodsreceiptDetail] })
    @ValidateNested({ each: true })
    @Type(() => UpdateGoodsreceiptDetail)
    goodsreceipt_detail: UpdateGoodsreceiptDetail[];
}
