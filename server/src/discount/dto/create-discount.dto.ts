import { ApiProperty, ApiTags } from "@nestjs/swagger"

export class CreateDiscountDto {
    @ApiProperty()
    discount_code: string
    @ApiProperty()
    condition: string
    @ApiProperty()
    discount: string
    @ApiProperty()
    start_date: string
    @ApiProperty()
    end_date: string
    @ApiProperty()
    active: string
}
