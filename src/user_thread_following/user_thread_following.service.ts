import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { Thread } from 'src/thread/entities/thread.entity';
import { In, Repository } from 'typeorm';
import { CreateUserThreadFollowingDto } from './dto/create-user_thread_following.dto';
import { UpdateUserThreadFollowingDto } from './dto/update-user_thread_following.dto';
import { UserThreadFollowing } from './entities/user_thread_following.entity';

@Injectable()
export class UserThreadFollowingService {
  constructor(
    @InjectRepository(UserThreadFollowing)
    private repo: Repository<UserThreadFollowing>,
    @InjectRepository(Thread)
    private threadRepo: Repository<Thread>,
    @InjectRepository(Post)
    private postRepo: Repository<Post>,
  ) {}
  create(createUserThreadFollowingDto: CreateUserThreadFollowingDto) {
    return this.repo.insert(createUserThreadFollowingDto);
  }

  findAll() {
    return `This action returns all userThreadFollowing`;
  }

  async findAllByUserId(user_id: number) {
    const userThreads = await this.repo.findBy({ user_id });
    const miMap = userThreads.map((thread) => {
      return thread.thread_id;
    });
    const threads = await this.threadRepo.findBy({
      id: In(miMap),
    });
    for (const thread of threads) {
      const thread_id = thread.id;
      const posts = await this.postRepo.findBy(thread);
      thread['posts'] = posts;
    }
    return threads;
  }

  update(
    id: number,
    updateUserThreadFollowingDto: UpdateUserThreadFollowingDto,
  ) {
    return `This action updates a #${id} userThreadFollowing`;
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
