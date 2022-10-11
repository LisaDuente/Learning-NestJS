import { IsString, IsNotEmpty } from "class-validator";

export class AdminAuthDto{
    @IsString()
    @IsNotEmpty()
    nickname: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;
}