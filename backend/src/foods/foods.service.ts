import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFoodDTO } from './dto/create-food.dto';
import { UpdateFoodDTO } from './dto/update-food.dto';
import { Food, FoodDocument } from './foods.schema';

@Injectable()
export class FoodsService {
  constructor(
    @InjectModel(Food.name)
    private foodsModel: Model<FoodDocument>,
  ) {}

  async saveFood(createFoodDTO: CreateFoodDTO, currentUser) {
    createFoodDTO.date = new Date(createFoodDTO.date);
    createFoodDTO.date.setHours(0, 0, 0, 0);
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
      .sort({ date: -1 });
  }

  async listAllFoods() {
    return await this.foodsModel.find().sort({ date: -1 });
  }

  async listDaysWithExceededCalories(currentUser) {
    return await this.foodsModel.aggregate([
      {
        $match: {
          owner: currentUser._id,
        },
      },
      { $group: { _id: '$date', sum: { $sum: '$calories' } } },
      { $match: { sum: { $gt: currentUser.maxCalories } } },
    ]);
  }

  async report() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const lastDate = new Date(date);
    lastDate.setDate(lastDate.getDate() - 14);
    const result = {};
    for (let d = date; d > lastDate; d.setDate(d.getDate() - 1)) {
      // const calories = await this.foodsModel.aggregate([
      //   { $match: { date: d } },
      //   { $group: { _id: '$date', sum: { $sum: '$calories' } } },
      // ]);
      const count = await this.foodsModel.count({ date: d });
      // if (calories.length) result[d.toDateString()] = calories[0].sum;
      result[d.toDateString()] = count;
    }
    return result;
  }

  async averageLastWeek(id: string) {
    const beforeWeekDate = new Date();
    beforeWeekDate.setDate(beforeWeekDate.getDate() - 7);
    const calories = await this.foodsModel.aggregate([
      [
        {
          $match: {
            date: {
              $gte: beforeWeekDate,
            },
          },
        },
        {
          $group: {
            _id: '$owner',
            sum: {
              $sum: '$calories',
            },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'owner',
          },
        },
        {
          $unwind: {
            path: '$owner',
          },
        },
        {
          $project: {
            _id: 1,
            name: '$owner.name',
            averageCalories: {
              $divide: ['$sum', 7],
            },
          },
        },
      ],
    ]);
    return calories;
  }

  async getOneFood(id: string) {
    return await this.foodsModel.findById(id);
  }

  async updateFood(updateFoodDTO: UpdateFoodDTO, id: string) {
    const food = await this.foodsModel.findById(id);
    if (!food) throw new NotFoundException('food not found');
    food.name = updateFoodDTO.name;
    food.calories = updateFoodDTO.calories;
    food.date = updateFoodDTO.date;
    return await food.save();
  }

  async deleteFood(id: string) {
    return await this.foodsModel.deleteOne({ _id: id });
  }
}
