import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from "@nestjs/websockets";
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import {Server, Socket} from 'socket.io'
import { UsersService } from "../users/users.service";
import { PostsService } from "../posts/posts.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { CreatePostDto } from "../posts/dto/create-post.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Messages IO')
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

  @ApiOperation({summary: 'socketEmit{createMessage}. Creates message in the room'})
  @SubscribeMessage('createMessage')
   async create(@MessageBody() createPostDto : CreatePostDto, @ConnectedSocket() client : Socket) {
    const message = await this.messagesService.create(createPostDto, client.id);
    this.server.emit('message',message);
    return message;
  }

  @ApiOperation({summary: 'socketEmit{findAllMessages}. Return all messages in the room'})
  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  @ApiOperation({summary: 'socketEmit{join}. Join to the room'})
  @SubscribeMessage('join')
  joinRoom(@MessageBody() createUserDto : CreateUserDto, @ConnectedSocket() client : Socket) {
    return this.messagesService.identify(createUserDto, client.id);
  }


}
