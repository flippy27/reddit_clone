import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { item_type as ItemType } from './item_type.entity';
import { image_type as ImageType } from './image_type.entity';
import { Post } from 'src/post/entities/post.entity';

@Entity()
export class ItemImage {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  image_name: string;
  @Column()
  image_extension: string;
  @Column()
  item_id: number;
  @ManyToOne(() => ItemType, (it) => it.itemImage)
  item_type: ItemType;

  @ManyToOne(() => ImageType, (it) => it.itemImage)
  image_type: ImageType;


}
