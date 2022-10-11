import { IsOptional, IsString } from "class-validator";

export class EditBoardgameDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    publisher: string;

    @IsString()
    @IsOptional()
    category: string;

    @IsString()
    @IsOptional()
    publicationDate?: string;
}