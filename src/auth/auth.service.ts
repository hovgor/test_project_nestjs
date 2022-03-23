import { Injectable, Logger } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { Repository } from "typeorm";
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import { TokenDto } from './dto/tokenDto';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User> ,
        private jwtService: JwtService,
        @InjectRepository(Auth) 
        private authRepository: Repository<Auth>
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
    // insert tokens in db
    async insertToken (token: TokenDto){
        try {
            await this.authRepository.save(this.authRepository.create(token));
        } catch (error) {
            Logger.log('error=> ',error);
            throw error;
        }
    }

// access and update tokens are missing from the database, that's why it "logout" doesn't work
    //LOGOUT
	// async logout(accessToken: string) {
	// 	try {
	// 		//revoke user session
	// 		await this.userSessionService.revokeSession(accessToken);
	// 	}
	// 	catch(error) {
	// 		Logger.log('logout: error =>', error);
	// 		throw {
	// 			message: error.message
	// 		};
	// 	}
	// }
}
