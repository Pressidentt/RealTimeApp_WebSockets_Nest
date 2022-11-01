import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";

interface PostCreationAttrs {
  content: string;
  userId: number;
  sender: string;
}
@Table({tableName: 'posts', timestamps:true})
export class Post extends Model<Post, PostCreationAttrs> {

@Column({type:DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

@Column({type: DataType.STRING, allowNull: false})
  content: string;

@ForeignKey(()=> User)
@Column({type: DataType.INTEGER})
  userId: number;

@Column({type:DataType.STRING})
  sender: string;

@BelongsTo(() => User)
  author: User;

}