import { Body, Controller, HttpStatus, Post, Res, UnprocessableEntityException } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { AuthLoginDto } from './dto/loginDto';
import { RegisterDto } from './dto/registerDto';
const sha1 = require('sha1');

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService
    ){}
    // login
    @Post('login')
    async login(@Res() res: Response, @Body() body: AuthLoginDto){
        try {
            let verifayEmail = await this.userService.getUserByQuery({email: body.email.toLowerCase()});
            if(!verifayEmail){
                throw "User with this email does not exists";
            }
            if(sha1(body.password) !== verifayEmail.password){
                throw " email or password not found !!! \n pleas lets try agen ";
            }
            let accessToken = await this.authService.loginAndJwt(body.email.toLowerCase(), jwtConstants.expiresIn);
            let refreshToken = await this.authService.loginAndJwt(body.email.toLocaleLowerCase(),jwtConstants.refreshToken); 
            
            return res.status(HttpStatus.OK).json({
                "accessToken": accessToken,
                "refreshToken": refreshToken    
        });
        } catch (error) {
            throw new UnprocessableEntityException(error);
        }

    }

    // register
    @Post('register')
    async register(@Res() res: Response, @Body() body: RegisterDto ){
        try {
            
            const verifayEmail = await this.userService.getUserByQuery({email: body.email.toLowerCase()});
           
            if(verifayEmail){
                throw "user with this email already exists" ;
            }
           
            if(body.retPassword !== body.password){
                throw "Passwords do not match"
            }

            const newUser = await this.userService.createUser({
                full_name: body.full_name,
                email:body.email.toLowerCase(),
                password: sha1(body.password)
            });

           return res.status(HttpStatus.OK).json({
               success:true,
               new_user_name: body.full_name
           });

        } catch (error) {
            throw new UnprocessableEntityException(error);
        }
    }

}
