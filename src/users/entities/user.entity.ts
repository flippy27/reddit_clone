import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    user_name: string
    @Column()
    email: string
    @Column()
    password: string
    @Column()
    role_id: number
}
