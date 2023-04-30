import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ItemImage } from './item_image.entity';
import { Post } from 'src/post/entities/post.entity';

@Entity()
export class item_type {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @OneToOne(() => ItemImage, (ii) => ii.item_type)
  itemImage: ItemImage;

  @OneToMany(() => Post, (post) => post.item_type)
  post: Post;
}
