import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { Theme } from './entities/theme.entity';

@Injectable()
export class ThemeService {
  constructor(
    @InjectRepository(Theme)
    private repo: Repository<Theme>,
  ) {}
  create(createThemeDto: CreateThemeDto) {
    return this.repo.insert(createThemeDto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findBy({id})
  }

  update(id: number, updateThemeDto: UpdateThemeDto) {
    return `This action updates a #${id} theme`;
  }

  remove(id: number) {
    return `This action removes a #${id} theme`;
  }
}
