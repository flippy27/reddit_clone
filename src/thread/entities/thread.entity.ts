import { Post } from 'src/post/entities/post.entity';
import { Theme } from 'src/theme/entities/theme.entity';
import { Users } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Thread {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToOne(() => Users, (user) => user.threads)
  user: Users;

  @Column({ type: 'timestamptz' })
  created_at: Date;
  @Column({ type: 'timestamptz' })
  updated_at: Date;

  @OneToMany(() => Post, (post) => post.thread)
  posts: Post[];
  @ManyToMany(() => Theme, { cascade: true })
  @JoinTable()
  themes: Theme[];
}
