import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  rating: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @MaxLength(200)
  comment: string;

  createAt: Date;
}
