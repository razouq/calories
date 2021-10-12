import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateFoodDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  calories: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
