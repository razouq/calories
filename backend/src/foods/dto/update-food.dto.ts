import { IsDateString, IsNotEmpty } from 'class-validator';

export class UpdateFoodDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  calories: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
