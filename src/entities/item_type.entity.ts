import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity ()
export class item_type {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
}