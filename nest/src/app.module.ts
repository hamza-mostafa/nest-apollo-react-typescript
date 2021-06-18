import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import {User} from "./users/users.entity";
import {Post} from "./posts/posts.entity";
import {ThrottlerModule} from "@nestjs/throttler";
import { MailModule } from './mail/mail.module';
import {ConfigModule} from "@nestjs/config";

const path = join(process.cwd(), 'src')

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: join(path, '/schema.gql'),
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: join(path, '/db.sqlite'),
      models: [User, Post],
      define: {
        timestamps: false
      },
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
