import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDTO {
  @ApiProperty()
  categoryName: string;
}
