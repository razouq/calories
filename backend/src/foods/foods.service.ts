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

  async listFoodsOfUser(currentUserId) {
    return await this.foodsModel
      .find({ owner: currentUserId })
      .sort({ createdAt: -1 });
  }

  async listAllFoods() {
    return await this.foodsModel.find().sort({ createdAt: -1 });
  }

  async listDaysWithExceededCalories(currentUser) {
    return await this.foodsModel.aggregate([
      { $group: { _id: '$date', sum: { $sum: '$calories' } } },
      { $match: { sum: { $gt: currentUser.maxCalories } } },
    ]);
  }
}
