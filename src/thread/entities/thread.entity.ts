import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Thread {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    user_id: number
    @Column()
    theme_id: number
    @Column({ type: 'timestamptz' })
    created_at: Date
    @Column({ type: 'timestamptz' })
    updated_at: Date
}
