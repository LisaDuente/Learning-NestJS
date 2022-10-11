import { IsNumber, IsOptional, IsString } from "class-validator"

export class AddTamaDto{
    @IsNumber()
    @IsOptional()
    id: number

    @IsString()
    name: string

    @IsString()
    color: string

    @IsString()
    price: string

    @IsString()
    publication_year: string
}