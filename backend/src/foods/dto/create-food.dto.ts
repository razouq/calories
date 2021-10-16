import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateFoodDTO {
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  calories: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
