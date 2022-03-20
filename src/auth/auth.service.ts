import { Injectable, Logger } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { Repository } from "typeorm";
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User> ,
        private jwtService: JwtService
    ){}
    
    // login
    async loginAndJwt(email: string, experationTime: string){
        try {
            const paylod = {email};
            return {
               accessToken: await this.jwtService.signAsync(paylod,{
                expiresIn: `${experationTime}s`
               })
            }
        } catch (error) {
            Logger.log('error=> ',error);
            throw error;
        }

    }
}
