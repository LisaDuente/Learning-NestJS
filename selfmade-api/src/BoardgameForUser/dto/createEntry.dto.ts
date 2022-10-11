import { Boardgame, User } from "@prisma/client";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateEntryDto{
    @IsNotEmpty()
    user: User;

    @IsNotEmpty()
    boardgame: Boardgame;

    @IsNumber()
    @IsNotEmpty()
    boardgameId: number;

}