import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from "@nestjs/websockets";
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import {Server, Socket} from 'socket.io'
import { UsersService } from "../users/users.service";
import { PostsService } from "../posts/posts.service";
@WebSocketGateway({
  cors : {
    origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;


  constructor(private readonly messagesService: MessagesService,
              private readonly userService : UsersService,
              private readonly postService : PostsService) {}

  @SubscribeMessage('createMessage')
   async create(@MessageBody() createMessageDto: CreateMessageDto, @ConnectedSocket() client : Socket) {
    const message = await this.messagesService.create(createMessageDto, client.id);
    this.server.emit('message',message);
    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }
  @SubscribeMessage('join')
  joinRoom(@MessageBody('name') name : string, @ConnectedSocket() client : Socket) {
    return this.messagesService.identify(name, client.id);
  }


}
