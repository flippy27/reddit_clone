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

  async findOne(id: number) {
    /* return this.repo
      .createQueryBuilder('comment')
      .leftJoinAndSelect('post.id', 'post_id')
      .where('comment.id = :id', { id: id })
      .getOne(); */
    const comment = await this.repo.findOne({
      where: { id: id },
    });

    return comment;
  }

  async findByPostID(post) {
    const root_comment: any = await this.repo.findOneBy(post);
    console.log('rc', root_comment);

    if (root_comment == null) {
      return HttpStatus.NOT_FOUND;
    }
    const id = root_comment.id;

    const data = await this.getCommentsRecursively(id);
    console.log('deita', data);

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
        }),
      );
      return { ...comment, child_comments: childCommentTrees };
    };
    const commentTree = await buildCommentTree(rootComment);
    return [commentTree];
  }

  findByPostID2(post) {
    return this.repo.findBy(post);
  }

  getOneByPostID(post) {
    return this.repo.findOneBy(post);
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.repo.update(id, updateCommentDto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
