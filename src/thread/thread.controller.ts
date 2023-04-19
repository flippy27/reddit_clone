import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('thread')
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  @Post()
  create(@Body() createThreadDto: CreateThreadDto) {
    return this.threadService.create(createThreadDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.threadService.findAll();
  }
  @Get('user/:user_id')
  findAllByUserId(@Param('user_id') user_id: number ){
    return this.threadService.findAllByUserId(user_id)

  }
  @Public()
  @Get('search/:name')
  findByName(@Param('name') name: string){
    return this.threadService.findByName(name)
  }
  @Public()
  @Get('posts/:thread_id')
  findThreadPosts(@Param('thread_id') thread_id: number){
    return this.threadService.findThreadPosts(thread_id)
  }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.threadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateThreadDto: UpdateThreadDto) {
    return this.threadService.update(+id, updateThreadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.threadService.remove(+id);
  }
}
