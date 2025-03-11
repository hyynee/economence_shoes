import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDiscountDto } from './create-discount.dto';

export class UpdateDiscountDto extends PartialType(CreateDiscountDto) {
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
