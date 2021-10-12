import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/users.schema';

export type FoodDocument = Food & Document;

@Schema({ timestamps: true })
export class Food {
  @Prop()
  name: string;

  @Prop()
  calories: number;

  @Prop()
  date: Date;

  @Prop({ type: Types.ObjectId, ref: User.name })
  owner: User;
}

export const FoodSchema = SchemaFactory.createForClass(Food);
