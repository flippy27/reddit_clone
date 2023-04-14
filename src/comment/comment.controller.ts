import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  
  @Public()
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }
  @Public()
  @Get()
  findAll() {
    return this.commentService.findAll();
  }
  @Public()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commentService.findOne(id);
  }

  /**
   *
   * @param post_id
   * @returns a recursive array of every comment child of the root comment
   */
  @Get('post/:post_id')
  findByPostID(@Param('post_id') post_id: number) {
    return this.commentService.findByPostID(post_id);
  }

  /**
   *
   * @param post_id
   * @returns an array of all the comments that belong to a post
   */
  @Get('post2/:post_id')
  findByPostID2(@Param('post_id') post_id: number) {
    return this.commentService.findByPostID2(post_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
