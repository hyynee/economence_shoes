import { IsInt, IsNotEmpty } from "class-validator";

class createDTO {
    @IsInt()
    @IsNotEmpty()
    account_id: number
    @IsInt()
    @IsNotEmpty()
    product_id: number;
}
export { createDTO };
