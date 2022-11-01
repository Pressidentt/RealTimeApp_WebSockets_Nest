import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { CreatePostDto } from "../posts/dto/create-post.dto";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto:CreateUserDto) {
    return 'It is cotroller not SOCKET !!'
  }

  async createPost(dto : CreatePostDto) {
    return 'It is cotroller not SOCKET !!'
  }
  async getAllUsers () {
    return await this.userRepository.findAll({ include: { all: true } })
  }

}
