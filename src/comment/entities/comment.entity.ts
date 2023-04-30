import { Post } from 'src/post/entities/post.entity';
import { Users } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Users, (user) => user.comments)
  user: Users;
  @Column({ nullable: true })
  parent_id: number;
  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
  @Column()
  comment_content: string;
  @Column({ type: 'timestamptz' })
  created_at: Date;
  @Column({ type: 'timestamptz' })
  updated_at: Date;
}
