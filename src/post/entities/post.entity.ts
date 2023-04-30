import { Comment } from 'src/comment/entities/comment.entity';
import { ItemImage } from 'src/entities/item_image.entity';
import { item_type as ItemType } from 'src/entities/item_type.entity';
import { Theme } from 'src/theme/entities/theme.entity';
import { Thread } from 'src/thread/entities/thread.entity';
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
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  post_content: string;
  @Column()
  vote_count: number;

  @ManyToOne(() => Thread, (thread) => thread.posts)
  thread: Thread;
  @ManyToOne(() => Users, (user) => user.posts)
  user: Users;
  @ManyToMany(() => Theme, (theme) => theme.post)
  theme: Theme[];
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
  @ManyToMany(() => Theme)
  @JoinTable()
  themes: Theme[];

  @ManyToOne(() => ItemType, (itemType) => itemType.post)
  item_type: ItemType;
  @Column({ type: 'timestamptz' })
  created_at: Date;
  @Column({ type: 'timestamptz' })
  updated_at: Date;
}
