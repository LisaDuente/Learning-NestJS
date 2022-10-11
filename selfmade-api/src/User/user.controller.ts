import { Controller, Patch, Post, Get, Delete, UseGuards, Param, Body } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../Auth/decorator';
import { JwtGuardUser } from '../Auth/guardUser';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private service: UserService){}

    //should have both guards but for testing purposes
    //with at user you can only reach the id of the one that is currently logged in
    //if you want to delete a user by an admin you need to get the user id via a param
    @UseGuards(JwtGuardUser)
    @Get("getMe")
    getMe(@GetUser() user: User){
        return user;
    }

    @UseGuards(JwtGuardUser)
    @Patch("editMe")
    editMe(@GetUser("id") userId: number, @Body()dto: EditUserDto){
        return this.service.editMe(userId, dto)
    }

    @UseGuards(JwtGuardUser)
    @Delete("deleteMe")
    deleteMe(@GetUser("id") userId: number){
        return this.service.deleteMe(userId)
    }

}
