import { Module} from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { PostsController } from "./posts.controller";
import { Post } from './posts.model';
import { PostsService } from "./posts.service";

@Module({
  imports: [SequelizeModule.forFeature([Post])],
  controllers : [PostsController],
  providers : [PostsService]

})
export class PostsModule {}
