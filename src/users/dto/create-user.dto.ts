import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

  @ApiProperty({example: 'Putin', description: 'Name of the user'})
  name : string;

}