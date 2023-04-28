import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    user_id: number
    @Column()
    theme_id: number
    @Column()
    post_content: string
    @Column()
    vote_count: number
    @Column()
    thread_id: number
    @Column({default:3})
    item_type_id: number
    @Column({type: 'timestamptz'})
    created_at: Date    
    @Column({type: 'timestamptz'})
    updated_at: Date

}

