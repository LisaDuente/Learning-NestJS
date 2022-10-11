import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class GetDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number

    @IsOptional()
    @IsString()
    tamaName: string
}