import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";


export class CreateSupplierDTO {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty({ message: "ID không được để trống" })
    supplier_id: number;


    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: "Tên nhà cung cấp không được để trống" })
    @Length(1, 55, { message: "Tên nhà cung cấp phải từ 1 đến 55 ký tự" })
    supplier_name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: "Địa chỉ không được để trống" })
    @Length(5, 65, { message: "Địa chỉ phải từ 5 đến 65 ký tự" })
    address: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: "Số điện thoại không được để trống" })
    @Length(1, 11, { message: "Địa chỉ phải từ 1 đến 11 ký tự" })
    phone_number: string;
}