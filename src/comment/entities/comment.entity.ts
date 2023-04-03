import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    user_id: number
    @Column({nullable: true})
    parent_id: number
    @Column()
    post_id: number
    @Column()
    comment_content: string
    @Column({type:'timestamptz'})
    created_at: Date
    @Column({type:'timestamptz'})
    updated_at: Date
}

