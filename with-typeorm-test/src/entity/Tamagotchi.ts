import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./User";
import { UserTama } from "./UserTama";

@Entity()
export class Tamagotchi extends BaseEntity{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({unique: true})
    public name: string;

    @Column()
    public color: string;

    @Column()
    public price: string;

    @Column()
    public publication_year: string;

    @OneToMany(() => UserTama, (userTama) => userTama.tama)
    public userTama: UserTama[]

}