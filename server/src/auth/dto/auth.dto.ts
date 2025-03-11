import { ApiProperty } from "@nestjs/swagger"
import { type } from "os"

class AccountInfoDTO  {
    account_id: number
    full_name: string
    email: string
    password: string
    role_id: string
}

class AccountLoginDTO  {
    @ApiProperty()
    email: string
    @ApiProperty()
    password: string
}

export { AccountInfoDTO, AccountLoginDTO } 