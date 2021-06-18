import {AutoIncrement, ForeignKey, PrimaryKey, Table, Column, Model, IsDate, BelongsTo} from 'sequelize-typescript';
import {User} from "../users/users.entity";


@Table
export class Post extends Model<Post> {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column title: string;

    @IsDate
    @Column
    createdAt: string;

    @ForeignKey(() => User)
    @Column
    createdBy: number;

    @BelongsTo(() => User)
    creator?: User
}
