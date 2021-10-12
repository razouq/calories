import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { CreateFoodDTO } from './dto/create-food.dto';
import { FoodsService } from './foods.service';
import { CurrentUser } from '../decorators/current-user.decorator';

@Controller('foods')
export class FoodsController {
  constructor(private foodsService: FoodsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createFood(
    @Body() createFoodDTO: CreateFoodDTO,
    @CurrentUser() CurrentUser,
  ) {
    return await this.foodsService.saveFood(createFoodDTO, CurrentUser);
  }

  @UseGuards(AuthGuard)
  @Get()
  async listFoods(@CurrentUser() currentUser) {
    if (currentUser.role === 'admin') return this.foodsService.listAllFoods();
    else return this.foodsService.listFoodsOfUser(currentUser._id);
  }

  @UseGuards(AuthGuard)
  @Get('exceeded-days')
  async listDaysWithExceededCalories(@CurrentUser() currentUser) {
    return this.foodsService.listDaysWithExceededCalories(currentUser);
  }
}
