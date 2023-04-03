import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private repo : Repository<Post>

  ){}
  create(createPostDto: CreatePostDto) {
    return this.repo.insert(createPostDto)
  }

  findAll() {
    return this.repo.find()
  }

  findOne(id: number) {
    return this.repo.findBy({id});
  }
  findAllByUserId(user_id: number){
    return this.repo.findBy({user_id})
  }
  findAllByTheme(theme_id: number){
    return this.repo.findBy({theme_id})
  }
  findAllByThread(thread_id: number){
    return this.repo.findBy({thread_id})
  }




  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
