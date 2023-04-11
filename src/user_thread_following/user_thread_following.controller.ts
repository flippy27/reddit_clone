import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserThreadFollowingService } from './user_thread_following.service';
import { CreateUserThreadFollowingDto } from './dto/create-user_thread_following.dto';
import { UpdateUserThreadFollowingDto } from './dto/update-user_thread_following.dto';

@Controller('userThreadFollowing')
export class UserThreadFollowingController {
  constructor(private readonly userThreadFollowingService: UserThreadFollowingService) {}

  @Post()
  create(@Body() createUserThreadFollowingDto: CreateUserThreadFollowingDto) {
    return this.userThreadFollowingService.create(createUserThreadFollowingDto);
  }

  @Get()
  findAll() {
    return this.userThreadFollowingService.findAll();
  }

  @Get(':user_id')
  findAllByUserId(@Param('user_id') id: number) {
    return this.userThreadFollowingService.findAllByUserId(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserThreadFollowingDto: UpdateUserThreadFollowingDto) {
    return this.userThreadFollowingService.update(+id, updateUserThreadFollowingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number,) {
    return this.userThreadFollowingService.remove(id);
  }
}
