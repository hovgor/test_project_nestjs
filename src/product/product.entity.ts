import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Product{
   
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    
    @Column()
    category: string;

    @Column()
    price: number;

    @Column()
    user_id: number;
}