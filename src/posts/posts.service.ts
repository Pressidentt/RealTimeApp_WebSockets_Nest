import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Post } from "./posts.model";
import { CreatePostDto } from "./dto/create-post.dto";

@Injectable()
export class PostsService {

 constructor(@InjectModel(Post) private postRepository : typeof Post) {}

  async createPost( dto : CreatePostDto ) {
      return await this.postRepository.create(dto);
  }

  async getAllPosts() {
   return await this.postRepository.findAll({include: {all : true}})
  }

}
