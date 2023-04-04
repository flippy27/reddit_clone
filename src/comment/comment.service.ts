import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private repo: Repository<Comment>,
  ) {}
  create(createCommentDto: CreateCommentDto) {
    return this.repo.insert(createCommentDto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findBy({ id });
  }

  async findByPostID(post_id: number) {
    const root_comment: any = await this.repo.findBy({ post_id });
    if (root_comment == null) {
      return HttpStatus.NOT_FOUND;
    }
    const id = root_comment.id;

    const data = await this.getCommentsRecursively(id);
    console.log(data);

    return data;
  }
  
  async getCommentsRecursively(root_comment_id: any): Promise<any[]> {
    const rootComment: any = await this.getOneByPostID(root_comment_id);
    if (!rootComment) {
      return [];
    }
    const buildCommentTree = async (comment: any) => {
      const childComments = await this.repo.findBy({ parent_id: comment.id });
      if (childComments.length === 0) {
        return comment;
      }
      const childCommentTrees = await Promise.all(
        childComments.map(async (childComment: any) => {
          const childCommentTree = await buildCommentTree(childComment);
          return childCommentTree;
        })
      );
      return { ...comment, child_comments: childCommentTrees };
    };
    const commentTree = await buildCommentTree(rootComment);
    return [commentTree];
  }

  getOneByPostID(post_id: number) {
    return this.repo.findOneBy({ post_id });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
