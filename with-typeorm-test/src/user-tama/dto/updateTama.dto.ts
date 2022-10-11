import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Condition } from "../../entity/UserTama";

export class UpdateTamaDto {
    @IsNotEmpty()
    @IsNumber()
    entryId: number

    @IsOptional()
    @IsString()
    condition: Condition
}