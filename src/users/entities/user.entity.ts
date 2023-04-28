import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    user_name: string
    @Column({unique:true})
    email: string
    @Column()
    password: string
    @Column({default:1})
    role_id: number
    @Column()
    salt: string
    @Column({nullable: true})
    token: string
}
