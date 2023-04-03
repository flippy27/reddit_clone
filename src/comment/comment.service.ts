import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor (
    @InjectRepository(Comment)
    private repo : Repository<Comment>

  ){}
  create(createCommentDto: CreateCommentDto) {
    return this.repo.insert(createCommentDto)
  }

  findAll() {
    return this.repo.find()
  }

  findOne(id: number) {
    return this.repo.findBy({id})
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
