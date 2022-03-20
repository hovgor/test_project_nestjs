import { Body, Controller, Delete, Get, HttpStatus, Param, Put, Res, UnprocessableEntityException } from '@nestjs/common';
import { Response } from 'express';
import { UserDto } from './dto/userDto';
import { UserService } from './user.service';
const sha1 = require('sha1');
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    // update user
    @Put('updateUser/:id')
    async updateUser(@Body() body: UserDto, @Param() id: number, @Res() res: Response){
        try {
            const userId = await this.userService.getUserByQuery({id:id});
            if(!userId){
                throw 'User is not found';
            }
            const newData = await this.userService.updateUserData(userId.id, {
               
                full_name: body.full_name,
                email: body.email,
                password: sha1(body.password)

            });
            return res.status(HttpStatus.OK).json({
                success: true + " : update the user",
                id: userId
            });

        } catch (error) {
            throw new UnprocessableEntityException(error);;
        }
    }

    //delete user by id
    @Delete('deleteUser/:id')
    async deleteUser(@Param() id: number, @Res() res: Response){
        try {
            const userId = await this.userService.getUserByQuery({id:id});
            if(!userId){
                throw 'User is not found';
            }
            await this.userService.deleteUser(id);
            return res.status(HttpStatus.OK).json({
                success: true + ' : delete the user',
                id: id
            })
        } catch (error) {
            throw new UnprocessableEntityException(error);
        }
    }

    // get user by id
    @Get('getOneUser/:id')
    async getOneUser(@Param() id: number, @Res() res: Response){
        try {
            const user = await this.userService.getUserByQuery({id:id});
            if(!user){
                throw 'User is not found';
            }
            return res.status(HttpStatus.OK).json({
                user_id: user.id,
                user_name: user.full_name,
                user_email:user.email,
            });
        } catch (error) {
            throw new UnprocessableEntityException(error);
        }
    }

    //get all user
    @Get('getAllUsers')
    async getAllUsers(@Res() res: Response){
        try {
            const allUsers = await this.userService.getAllUsers();
           const result = [];
           for(const allUser of allUsers){
               result.push({
                   firstName:allUser.full_name,
                   email:allUser.email,                   
               });               
           }
           return res.status(HttpStatus.OK).json(result);
        } catch (error) {
            throw new UnprocessableEntityException(error);
        }
    }
}

