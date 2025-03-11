import { ApiProperty } from "@nestjs/swagger";

class cartDTO  {
    @ApiProperty()
    product_id: number;
    @ApiProperty()
    quantity: number;
}


export {cartDTO}