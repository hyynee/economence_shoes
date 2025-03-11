import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {     
    @ApiProperty()
    customer_name?: string;
    @ApiProperty()
    phone_number?: string;
}
