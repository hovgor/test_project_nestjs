import {  isNotEmpty, IsString } from "class-validator";

export class UserDto{
    
    
    @IsString()
    full_name: string;

    @IsString()
    email: string;

    @IsString()
    password:string;
    

}