import { Post } from 'src/post/entities/post.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Role } from 'src/role/entities/role.entity';
import { Thread } from 'src/thread/entities/thread.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({ nullable: true })
  token: string;

  @ManyToOne(() => Role, (role) => role.user)
  role: Role;

  @OneToMany(() => Thread, (thread) => thread.user)
  threads: Thread[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @ManyToMany(() => Users, (user) => user.followers)
  @JoinTable({ name: 'user_following_user' })
  following: Users[];

  @ManyToMany(() => Users, (user) => user.following)
  followers: Users[];

  @ManyToMany(() => Thread)
  @JoinTable({ name: 'user_following_thread' })
  thread_following: Thread[];

  @ManyToMany(() => Post)
  @JoinTable({ name: 'user_following_post' })
  post_following: Post[];

  @ManyToMany(() => Comment)
  @JoinTable({ name: 'user_following_comment' })
  comment_following: Comment[];
}
