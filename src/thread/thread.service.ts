import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { item_image } from 'src/entities/item_image.entity';
import { Post } from 'src/post/entities/post.entity';
import { Repository } from 'typeorm';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { Thread } from './entities/thread.entity';

@Injectable()
export class ThreadService {
  constructor(
    @InjectRepository(Thread)
    private repo: Repository<Thread>,
    @InjectRepository(Post)
    private postRepo: Repository<Post>,
    @InjectRepository(item_image)
    private imageRepo: Repository<item_image>,
  ) {}
  create(createThreadDto: CreateThreadDto) {
    return this.repo.insert(createThreadDto);
  }

  findAll() {
    return this.repo.find();
  }
  findAllByUserId(user_id: number) {
    return this.repo.query(
      `
    SELECT t.id, t."name", t.created_at, u.user_name, th."name" AS theme_name  FROM thread t 
    JOIN users u ON t.user_id = u.id
    JOIN theme th ON t.theme_id= th.id 
     WHERE t.user_id =` + user_id,
    );
  }
  findByName(name: string) {
    return this.repo
      .createQueryBuilder('thread')
      .where('LOWER(thread.name) like :name', {
        name: `%${name.toLowerCase()}%`,
      })
      .getMany();
  }
  async findThreadPosts(id: number) {
    let thread = await this.repo.findOneBy({ id });
    const thread_id = id;
    let posts = await this.postRepo.findBy({ thread_id });
    for await (const post of posts) {
      let item_type_id=3
      let item_id= post.id
      let images= await this.imageRepo.findBy({ item_type_id, item_id})
      post['images']= images
    } 
    thread['posts']= posts
    return thread
  }

  findOne(id: number) {}

  update(id: number, updateThreadDto: UpdateThreadDto) {
    return this.repo.update(id, updateThreadDto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
