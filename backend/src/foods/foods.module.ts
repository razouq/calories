import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { User, UserSchema } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import { FoodsController } from './foods.controller';
import { Food, FoodSchema } from './foods.schema';
import { FoodsService } from './foods.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }]),
    UsersModule,
  ],
  controllers: [FoodsController],
  providers: [FoodsService],
})
export class FoodsModule {}
