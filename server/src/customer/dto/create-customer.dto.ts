import { ApiProperty } from "@nestjs/swagger"

export class CreateCustomerDto {
    @ApiProperty()
    customer_id: number
    @ApiProperty()
    customer_name: string
    @ApiProperty()
    phone_number: string
}
