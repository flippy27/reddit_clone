import { Module } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { ThreadController } from './thread.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread } from './entities/thread.entity';
import { Post } from 'src/post/entities/post.entity';
import { ItemImage } from 'src/entities/item_image.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Thread, Post, ItemImage])],
  controllers: [ThreadController],
  providers: [ThreadService]
})
export class ThreadModule {}
