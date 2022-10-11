import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable, OneToMany } from "typeorm"
import { Tamagotchi } from "./Tamagotchi"
import { UserTama } from "./UserTama"

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @OneToMany(() => UserTama, (userTama) => userTama.user)
    userTama: UserTama[]

   static findTamas(userId: number){
        return this.createQueryBuilder()
        .select("tamagotchi")
        .where("user.id = :id", {id: userId})
        .getMany()
    }

}
