import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Comment } from 'src/comment/entities/comment.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private repo: Repository<Post>,
    @InjectRepository(Users)
    private userRepo: Repository<Users>,
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,
  ) {}
  create(createPostDto: CreatePostDto) {
    return this.repo.insert(createPostDto);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const post = await this.repo.findOneBy({ id });

    const userid = post.user_id;
    console.log('user_id', userid);

    const username = await this.userRepo.findOne({
      select: ['user_name'],
      where: { id: userid },
    });
    post['user'] = username;
    const post_id = post.id;
    const rootComments = await this.commentRepo.findBy({ post_id });
    console.log('pre post', post);

    post['comments'] = await this.commentRepo.findBy({ post_id });
    console.log('post post', post);

    return post;
  }

  findAllByUserId(user_id: number) {
    return this.repo.findBy({ user_id });
  }
  findAllByTheme(theme_id: number) {
    return this.repo.findBy({ theme_id });
  }
  findAllByThread(thread_id: number) {
    return this.repo.findBy({ thread_id });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
