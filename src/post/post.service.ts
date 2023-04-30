import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { ItemImage } from 'src/entities/item_image.entity';
import { item_image_DTO } from 'src/entities/Dtos/item_image.dto';
import { Theme } from 'src/theme/entities/theme.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private repo: Repository<Post>,
    @InjectRepository(Users)
    private userRepo: Repository<Users>,
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,
    @InjectRepository(ItemImage)
    private itemImage: Repository<ItemImage>,
  ) {}

  async create(createPostDto: CreatePostDto, file: Express.Multer.File) {
    let postReturn = await this.repo.insert(createPostDto);
    let image = {
      image_name: file.path.split('\\')[1],
      image_extension: file.originalname.split('.')[1],
      item_type_id: 3,
      item_id: postReturn.identifiers[0].id,
      image_type_id: 3,
    };
    createPostDto.item_type_id = 3;
    let imageReturn = await this.itemImage.insert(image);
    return { postReturn, imageReturn };
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const post = await this.repo.findOne({
      where: { id: id },
      relations: ['user', 'themes','comments'],
    });
    //const all_comments = await this.commentRepo.findBy(post);
    return post;
    /*   const post = await this.repo.findOneBy({ id });

    const username = await this.userRepo.findOne({
      select: ['user_name'],
      where: { id: post.user.id },
    });
    post['user'] = username;
    const post_id = post.id;
    const rootComments = await this.commentRepo.findBy(post);
    console.log('pre post', post); */

    /* const all_comments = await this.commentRepo.findBy({ post_id });
    for (let i = 0; i < all_comments.length; i++) {
      const element = all_comments[i];
      const user_id: any = element.user_id;
      const user = await this.userRepo.findOne({
        select: ['user_name'],
        where: { id: user_id },
      });
      element['user'] = user;
    }
    post['comments'] = all_comments;
    console.log('post post', post);

    return post; */
  }
  getUserForComment(user_id) {
    return new Promise((res, rej) => {
      try {
        res(this.userRepo.findOneBy(user_id));
      } catch {
        rej(null);
      }
    });
  }

  findAllByUserId(user) {
    return this.repo.findBy(user);
  }
  findAllByTheme(theme) {
    return this.repo.findBy(theme);
  }
  findAllByThread(thread) {
    return this.repo.findBy(thread);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
