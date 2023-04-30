import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ItemImage } from './item_image.entity';

@Entity()
export class image_type {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @OneToOne(() => ItemImage, (ii) => ii.item_type)
  itemImage: ItemImage;
}
