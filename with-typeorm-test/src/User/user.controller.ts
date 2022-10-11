import { Post } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Body, Controller, Get } from '@nestjs/common';
import { User } from '../entity/User';
import { UserDto } from './dto/User.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private service: UserService){}

    @Get("/all")
    getAll(){
        return this.service.getAll()
    }

    @Post("/add")
    addUser(@Body() dto: UserDto){
       return this.service.addUser(dto)
    }

    @Post("/add/tama")
    addTamaToUser(@Body() dto: UserDto){
       return this.service.addTamaToUser(dto.id, dto.tamagotchi)
    }
    /*
    @Delete("/delete/tama")
    deleteTamaFromUser(@Body() dto: UserDto){
        return this.service.deleteTama(dto.id, dto.tamagotchi)
    }*/

}
