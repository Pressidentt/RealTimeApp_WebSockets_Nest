import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Post } from "../posts/posts.model";

interface UserCreationAttrs {
  name: string;
  password: string;
  socketId:string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING})
  name: string;

  @Column({type: DataType.STRING, allowNull:true})
  password: string;

  @HasMany(()=>Post)
  posts : Post[];

  @Column({type:DataType.STRING})
  socketId : string;
}
