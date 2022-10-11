import { userInfo } from "os";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tamagotchi } from "./Tamagotchi";
import { User } from "./User";

export enum Condition {
    MINT = "MINT",
    NEAR_MINT = "NEAR_MINT",
    LIGHTLY_PLAYED = "LIGHTLY_PLAYED",
    MODERATELY_PLAYED = "MODERATELY_PLAYED",
    HEAVILY_PLAYED = "HEAVILY_PLAYED",
    DAMAGED = "DAMAGED"
}

@Entity()
export class UserTama extends BaseEntity{
    @PrimaryGeneratedColumn()
    public id: number
    
    @Column()
    public userId: number

    @Column()
    public tamaId: number

    @Column({type: "enum", enum: Condition, default: Condition.LIGHTLY_PLAYED})
    public condition!: Condition

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