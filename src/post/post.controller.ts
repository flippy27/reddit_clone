import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }
  @Get('user/:user_id')
  findAllByUserId(@Param('user_id') user_id: number){
    return this.postService.findAllByUserId(user_id)
  }
  @Get('/:id')
  findById(@Param('id') id:number){
    return this.postService.findOne(id)

  }
  
  @Get('theme/:theme_id')
  findAllByTheme(@Param('theme_id') theme_id: number){
    return this.postService.findAllByTheme(theme_id)
    

  }
  @Get('thread/:thread_id')
  findAllBythread(@Param('thread_id') thread_id: number){
    return this.postService.findAllByThread(thread_id)
    

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
