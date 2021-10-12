import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { FoodsModule } from './foods/foods.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    MailModule,
    FoodsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
