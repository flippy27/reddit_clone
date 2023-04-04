import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
constructor(
  @InjectRepository(Users)
  private repo: Repository<Users>
){}
  create(createUserDto: CreateUserDto) {
    return this.repo.insert(createUserDto)
  }

  findAll() {
    return this.repo.find()
  }

  findOne(email: string) {
    return this.repo.findBy({email})
  }
  async findOneByEmail(email: string) {
    const user = await this.repo.findOneBy({ email });
    console.log('esta es service', user);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
