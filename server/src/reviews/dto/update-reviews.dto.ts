import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class UpdateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  comment: string;

  updateAt: Date;
}
