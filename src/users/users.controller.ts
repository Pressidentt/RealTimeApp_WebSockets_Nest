import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { CreatePostDto } from "../posts/dto/create-post.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {

  constructor(private userService : UsersService) {}
  
  @ApiOperation({summary: 'socketEmit{join}. Join to the room'})
  @Post('join')
  joinRoom(@Body() dto : CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @ApiOperation({summary: 'socketEmit{createMessage}. Creates message in the room'})
  @Post('createMessage')
  createPost(@Body() dto : CreatePostDto) {
    return this.userService.createPost(dto);
  }

  @ApiOperation({summary: 'socketEmit{findAllMessages}. Return all messages in the room'})
  @Get('/all')
  getAllUsers(){
    return this.userService.getAllUsers();
  }


}
