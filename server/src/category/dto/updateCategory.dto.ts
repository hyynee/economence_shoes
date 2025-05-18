import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDTO {
  @ApiProperty()
  categoryName: string;
}
