import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { CreateFoodDTO } from './dto/create-food.dto';
import { FoodsService } from './foods.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import { Types } from 'mongoose';

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
  @Get(':id')
  async getOneFood(@Param('id') id: string) {
    const validObjectId = Types.ObjectId.isValid(id);
    if (!validObjectId) {
      throw new BadRequestException('Invalid ObjectId');
    }
    const food = await this.foodsService.getOneFood(id);
    if (!food) throw new BadRequestException('food not found');
    return food;
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

  @UseGuards(AuthGuard)
  @Get('report')
  async report() {
    return this.foodsService.report();
  }
}
