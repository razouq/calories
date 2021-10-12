import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFoodDTO } from './dto/create-food.dto';
import { Food, FoodDocument } from './foods.schema';

@Injectable()
export class FoodsService {
  constructor(
    @InjectModel(Food.name)
    private foodsModel: Model<FoodDocument>,
  ) {}

  async saveFood(createFoodDTO: CreateFoodDTO, currentUser) {
    const foodBody = {
      ...createFoodDTO,
      owner: currentUser._id,
    };
    const food = new this.foodsModel(foodBody);
    return await food.save();
  }
}
