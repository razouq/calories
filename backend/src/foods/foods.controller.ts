import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { CreateFoodDTO } from './dto/create-food.dto';
import { FoodsService } from './foods.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import { Types } from 'mongoose';
import { UpdateFoodDTO } from './dto/update-food.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('foods')
export class FoodsController {
  constructor(private foodsService: FoodsService) {}

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Get('report')
  async report() {
    return this.foodsService.report();
  }

  @UseGuards(AuthGuard)
  @Get('exceeded-days')
  async listDaysWithExceededCalories(@CurrentUser() currentUser) {
    return this.foodsService.listDaysWithExceededCalories(currentUser);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Get('average-last-week')
  async averageLastWeek(@CurrentUser() currentUser) {
    return this.foodsService.averageLastWeek(currentUser._id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createFood(
    @Body() createFoodDTO: CreateFoodDTO,
    @CurrentUser() CurrentUser,
  ) {
    return await this.foodsService.saveFood(createFoodDTO, CurrentUser);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Get(':id')
  async getFood(@Param('id') id: string) {
    const validObjectId = Types.ObjectId.isValid(id);
    if (!validObjectId) {
      throw new BadRequestException('Invalid ObjectId');
    }
    const food = await this.foodsService.getOneFood(id);
    if (!food) throw new BadRequestException('food not found');
    return food;
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateFood(
    @Body() updateFoodDTO: UpdateFoodDTO,
    @Param('id') id: string,
  ) {
    const validObjectId = Types.ObjectId.isValid(id);
    if (!validObjectId) {
      throw new BadRequestException('Invalid ObjectId');
    }
    return await this.foodsService.updateFood(updateFoodDTO, id);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteFood(@Param('id') id: string) {
    const validObjectId = Types.ObjectId.isValid(id);
    if (!validObjectId) {
      throw new BadRequestException('Invalid ObjectId');
    }
    return await this.foodsService.deleteFood(id);
  }

  @UseGuards(AuthGuard)
  @Get()
  async listFoods(@CurrentUser() currentUser) {
    if (currentUser.role === 'admin') return this.foodsService.listAllFoods();
    else return this.foodsService.listFoodsOfUser(currentUser._id);
  }
}
