import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class CreatePostDto {

  @ApiProperty({example: 'Ti putin', description: 'Content of the message'})
  @IsString()  
  content : string;

}