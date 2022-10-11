import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetAdmin } from 'src/Auth/decorator/getAdmin.decorator';
import { JwtGuardAdmin } from '../Auth/guardAdmin';
import { BoardgameService } from './boardgame.service';
import { CreateBoardgameDto, EditBoardgameDto } from './dto';


@Controller('boardgame')
export class BoardgameController {
    constructor(private service: BoardgameService){}

    @Get("allBoardgames")
    getAllGames(){
        //dont really know wich kind of parameters I need and how to return a bunch of boardgames
        return this.service.getAllGames();
    }

    @Get("title/:title")
    getBoardgameByTitle(@Param("title") title: string){
        return this.service.getBoardgameByTitle(title);
    }

    @Get("publisher/:publisher")
    getBoardgameByPublisher(@Param("publisher") publisher: string){
        return this.service.getBoardgameByPublisher(publisher);

    }

    @Get("category/:category")
    getBoardgameByCategory(@Param("category") category: string){
        return this.service.getBoardgameByCategory(category);

    }


    //only admins
    @UseGuards(JwtGuardAdmin)
    @Post("addBoardgame")
    addBoardgame(@Body() dto: CreateBoardgameDto){
        return this.service.addBoardgame(dto);
        
    }

    @UseGuards(JwtGuardAdmin)
    @Patch("/edit/:id")
    editBoardgame(@Param("id", ParseIntPipe) boardgameId: number,@Body() dto: EditBoardgameDto){
        return this.service.editBoardgame(boardgameId, dto);
    }

    @UseGuards(JwtGuardAdmin)
    @Delete("/delete/:id")
    deleteBoardgame(@Param("id", ParseIntPipe) boardgameId: number){
        return this.service.deleteBoardgame(boardgameId);
    }

    @UseGuards(JwtGuardAdmin)
    @Delete("/deleteTitle/:title")
    deleteBoardgameByTitle(@Param("title") title: string){
        return this.service.deleteBoardgameByTitle(title);
    }


}
