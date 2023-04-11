import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Users } from 'src/users/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Post, Users])],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
