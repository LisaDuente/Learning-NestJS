import { IsNumber, IsString, IsOptional } from "class-validator";
import { Tamagotchi } from "../../entity/Tamagotchi";
import { UserTama } from "../../entity/UserTama";

export class UserDto {
    @IsNumber()
    id: number

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsNumber()
    @IsOptional()
    age: number;

    @IsOptional()
    tamagotchi: Tamagotchi[]
}