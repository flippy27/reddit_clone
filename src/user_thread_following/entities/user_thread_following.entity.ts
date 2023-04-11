import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserThreadFollowing {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    user_id: number
    @Column()
    thread_id: number
}
