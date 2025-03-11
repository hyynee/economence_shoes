import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ChangePassWordDto {
    @ApiProperty()
    @IsString()
    oldPassword: string;    
    @IsString()
    @ApiProperty()
    newPassword: string;
}