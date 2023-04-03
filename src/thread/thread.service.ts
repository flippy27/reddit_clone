import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { Thread } from './entities/thread.entity';

@Injectable()
export class ThreadService {
  constructor(
    @InjectRepository(Thread)
    private repo : Repository<Thread>

  ){}
  create(createThreadDto: CreateThreadDto) {
    return this.repo.insert(createThreadDto)
  }

  findAll() {
    return this.repo.find()
  }
  findAllByUserId(user_id: number){
    return this.repo.findBy({user_id})

  }

  findOne(id: number) {
    return this.repo.findBy({id});
  }

  update(id: number, updateThreadDto: UpdateThreadDto) {
    return `This action updates a #${id} thread`;
  }

  remove(id: number) {
    return `This action removes a #${id} thread`;
  }
}
