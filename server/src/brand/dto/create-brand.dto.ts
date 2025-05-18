import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandDTO {
  @ApiProperty()
  brandName: string;
}
