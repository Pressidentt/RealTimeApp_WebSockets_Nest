import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { PostsModule } from './posts/posts.module';
import path from "path";
import { ConfigModule } from "@nestjs/config";

import {SequelizeModule} from "@nestjs/sequelize";
import { User } from "./users/users.model";
import { Post } from "./posts/posts.model";

@Module({
  controllers: [],
  providers: [],
  imports: [ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`
  }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      protocol: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Post],
      autoLoadModels: true
    }),
    UsersModule,
    PostsModule,
    ],

})
export class AppModule {}
