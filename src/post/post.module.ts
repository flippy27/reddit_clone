import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Users } from 'src/users/entities/user.entity';
import { Comment } from '../comment/entities/comment.entity';
// import { SharedModule } from 'src/shared/shared/shared.module';
import { ItemImage } from 'src/entities/item_image.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Users, Comment, ItemImage])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
