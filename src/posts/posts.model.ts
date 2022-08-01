import { BelongsTo, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";

interface PostCreationAttrs {
  content: string;
  userId: number;
}
@Table({tableName: 'posts', timestamps:true})
export class Post extends Model<Post, PostCreationAttrs> {

@Column({type:DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

@Column({type: DataType.STRING, allowNull: false})
  content: string;

@Column({type: DataType.INTEGER})
  userId: number;

@BelongsTo(() => User)
  author: User;

}