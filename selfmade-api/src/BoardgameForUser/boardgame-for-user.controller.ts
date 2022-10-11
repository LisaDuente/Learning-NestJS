import { Controller, Get, ParseIntPipe } from '@nestjs/common';
import { GetUser } from '../Auth/decorator';
import { BoardgameForUserService } from './boardgame-for-user.service';
import { CreateEntryDto } from './dto';

@Controller('boardgame-for-user')
export class BoardgameForUserController {
    constructor(private service: BoardgameForUserService){

    }

    @Get("swapi")
    getPeopleSwapi(){
        return this.service.callSwapiPeople();
    }

    
    getAllGamesForUser(@GetUser("id", ParseIntPipe) userId: number){

    }

    getTitleForUser(){

    }

    getLatestEntryForUser(@GetUser("id", ParseIntPipe) userId: number){

    }

    getCategoryForUser(){

    }

    getPublisherForUser(){

    }

    getCountGamesForUser(){

    }

    //maybe we dont even need a dto here because we need to find the boardgame and then just add a user...?
    createEntry(@GetUser("id", ParseIntPipe) userId: number, dto: CreateEntryDto){
        return this.service.addEntry(userId, dto);
    }


}
