import { userInfo } from "os";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tamagotchi } from "./Tamagotchi";
import { User } from "./User";

@Entity()
export class UserTama extends BaseEntity{
    @PrimaryGeneratedColumn()
    public id: number
    
    @Column()
    public userId: number

    @Column()
    public tamaId: number

    @ManyToOne(() => User, (user) => user.userTama)
    public user: User

    @ManyToOne(() => Tamagotchi, (tamagotchi) => tamagotchi.userTama)
    public tama: Tamagotchi

    static findAllTamas(userID: number){
        return this.createQueryBuilder()
        .leftJoinAndSelect("UserTama.tama", "Tamagotchis")
        .where({userId: userID})
        .getMany()
    }
    
}