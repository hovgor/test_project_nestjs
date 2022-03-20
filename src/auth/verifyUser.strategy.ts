import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";
import { jwtConstants } from "./constants";


@Injectable()
export class VerifyUserStrategy extends PassportStrategy(Strategy, 'verifyUser'){
    constructor(
        private readonly userService: UserService,
    
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.userSecret,
            passReqToCallback: true
        })
    }
    async validate(payload : any): Promise<any>{
        const {iat, exp, ...res} = payload;
        return res;
    }
}