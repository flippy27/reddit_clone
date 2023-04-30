import { Post } from 'src/post/entities/post.entity';
import { Thread } from 'src/thread/entities/thread.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Theme {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @OneToMany(() => Post, (post) => post.theme)
  post: Post;
  @ManyToMany(() => Thread, (thread) => thread.themes)
  thread: Thread[];
}
