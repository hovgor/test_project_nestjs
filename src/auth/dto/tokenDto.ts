import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TokenDto{
    @IsNumber()
    @IsNotEmpty()
    user_id:  number;

    @IsString()
    @IsNotEmpty()
    accessToken: any;

    @IsString()
    @IsNotEmpty()
    refreshToken: any;
};