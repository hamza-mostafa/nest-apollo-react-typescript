import {AutoIncrement, PrimaryKey, Table, Column, Model, AllowNull, IsEmail, HasMany} from 'sequelize-typescript';
import {Post} from "../posts/posts.entity";

@Table
export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column name: string;

    @IsEmail
    @Column
    email: string;

    @Column password: string;

    @AllowNull
    @Column
    reset_token: string;

    @AllowNull
    @Column
    token: string;

    @HasMany(() => Post)
    posts?: [Post]
}
