import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from "./entities/message.entity";
import { PostsService } from "../posts/posts.service";

@Injectable()
export class MessagesService {

  constructor(private postService : PostsService) {}

  messages:Message[] = [{name:'Lyana', text: 'kak delishki'}]
  clientToUser = {}

  async create(createMessageDto: CreateMessageDto, clientId: string) {
    let message = {
      name : this.clientToUser[clientId],
      text : createMessageDto.text
    };
    this.messages.push(createMessageDto)
    return message;
  }

  findAll() {
    return this.messages;
  }

  identify(name: string, clientId : string) {
    this.clientToUser[clientId] = name;
    return Object.values(this.clientToUser);
  }
}
