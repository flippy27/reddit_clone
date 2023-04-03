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

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'reddit_clone',
    entities: [Users, Role, Thread, Post],
    synchronize: true,
  }),UsersModule, RoleModule, ThreadModule, PostModule,], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
