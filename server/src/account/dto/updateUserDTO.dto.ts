import { ApiProperty } from "@nestjs/swagger"

class UpdateAccountDto {
    account_id: number
    @ApiProperty()
    full_name: string
    @ApiProperty()
    email: string
    @ApiProperty()
    password: string
    role_id: string
}
export { UpdateAccountDto }
