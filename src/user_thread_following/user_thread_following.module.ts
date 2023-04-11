import { Module } from '@nestjs/common';
import { UserThreadFollowingService } from './user_thread_following.service';
import { UserThreadFollowingController } from './user_thread_following.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserThreadFollowing } from './entities/user_thread_following.entity';
import { Thread } from 'src/thread/entities/thread.entity';
import { Post } from 'src/post/entities/post.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserThreadFollowing, Thread, Post])],
  controllers: [UserThreadFollowingController],
  providers: [UserThreadFollowingService]
})
export class UserThreadFollowingModule {}
