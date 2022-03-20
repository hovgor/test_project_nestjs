import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports:[TypeOrmModule.forFeature([User])],
  exports:[UserService],
  providers:[UserService]
})
export class UserModule {}
