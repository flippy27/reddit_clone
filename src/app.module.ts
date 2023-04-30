import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Users } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { RoleModule } from './role/role.module';
import { Role } from './role/entities/role.entity';
import { ThreadModule } from './thread/thread.module';
import { Thread } from './thread/entities/thread.entity';
import { PostModule } from './post/post.module';
import { Post } from './post/entities/post.entity';
import { ThemeModule } from './theme/theme.module';
import { Theme } from './theme/entities/theme.entity';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/entities/comment.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { ConfigModule } from '@nestjs/config';
import { UserThreadFollowingModule } from './user_thread_following/user_thread_following.module';
import { UserThreadFollowing } from './user_thread_following/entities/user_thread_following.entity';
import { SharedModule } from './shared/shared/shared.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { item_type } from './entities/item_type.entity';
import { ItemImage } from './entities/item_image.entity';
import { image_type } from './entities/image_type.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [
        Users,
        Role,
        Thread,
        Post,
        Theme,
        Comment,
        //UserThreadFollowing,
        item_type,
        ItemImage,
        image_type,
      ],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy()
    }),
    UsersModule,
    RoleModule,
    ThreadModule,
    PostModule,
    ThemeModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', './upload'), // added ../ to get one folder back
      serveRoot: '/upload/', //last slash was important
    }),

    CommentModule,
    AuthModule,
    UserThreadFollowingModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
