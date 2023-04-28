import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity ()
export class item_image {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    image_name: string;
    @Column()
    image_extension: string;
    @Column()
    item_id: number;
    @Column()
    item_type_id: number;
    @Column()
    image_type_id: number;
}