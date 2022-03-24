import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/user/user.controller';
import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { Auth } from './auth.entity';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';


@Module({
  controllers: [AuthController,UserController], 
  providers: [AuthService, JwtStrategy ],
  imports:[
    TypeOrmModule.forFeature([User,Auth]),
    
    forwardRef(() => UserModule),
    JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: jwtConstants.expiresIn },
		}),

],

})
export class AuthModule {}
