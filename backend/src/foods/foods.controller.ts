import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { CreateFoodDTO } from './dto/create-food.dto';
import { FoodsService } from './foods.service';
import { CurrentUser } from '../decorators/current-user.decorator';

@Controller('foods')
export class FoodsController {
  constructor(private foodsService: FoodsService) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async createFood(
    @Body() createFoodDTO: CreateFoodDTO,
    @CurrentUser() CurrentUser,
  ) {
    return await this.foodsService.saveFood(createFoodDTO, CurrentUser);
  }
}
