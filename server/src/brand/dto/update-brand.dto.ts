import { ApiProperty } from '@nestjs/swagger';

export class UpdateBrandDTO {
  @ApiProperty()
  brandName: string;
}
