import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBoardgameDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    publisher: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsString()
    @IsOptional()
    publicationDate?: string;
}