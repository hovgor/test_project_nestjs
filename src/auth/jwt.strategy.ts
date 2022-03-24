import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";
import { jwtConstants } from "./constants";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly userService: UserService,
    
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'aaaa',
            passReqToCallback: true
        })
    }
    async validate(context, payload : any): Promise<any>{
       
          // const session = await this.userSessionServise.checkUserSession(
    //   context.headers.authorization.replace('Bearer ', ''),
    // );

    // if (!session) {
    //   throw new UnauthorizedException();
    // }

    const user = await this.userService.getUserByQuery({ id: payload.sub });

    if (!user) {
      throw new UnauthorizedException();
    }
    
    return user;
    }
}