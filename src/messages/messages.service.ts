import { Injectable } from "@nestjs/common";
import { Message } from "./entities/message.entity";
import { PostsService } from "../posts/posts.service";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { CreatePostDto } from "../posts/dto/create-post.dto";
import { Post } from "../posts/posts.model";

@Injectable()
export class MessagesService {

  constructor(private postService : PostsService,
              private usersService : UsersService,
              @InjectModel(User) private userRepository: typeof User,
              @InjectModel(Post) private postRepository : typeof Post) {}


  async create(dto: CreatePostDto, clientId: string) {
    let user = await this.userRepository.findOne({where:{socketId:clientId}})

    let sender_name = user.name;

    return await this.postRepository.create({ ...dto, sender: sender_name, userId: user.id });
    /*let message = {
      name : this.clientToUser[clientId],
      text : createMessageDto.text
    };
    this.messages.push(createMessageDto)
    return message;*/
  }

  findAll() {
    return this.postService.getAllPosts()
  }

  async identify(dto : CreateUserDto, clientId) {
    return await this.userRepository.create({...dto,socketId:clientId})};
  }

