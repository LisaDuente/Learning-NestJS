import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Boardgame } from '@prisma/client';
import { check } from 'prettier';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBoardgameDto, EditBoardgameDto } from './dto';

@Injectable()
export class BoardgameService {
    constructor(private prisma: PrismaService){

    }

    async getAllGames(){
        const boardgames = await this.prisma.boardgame.findMany();
        return boardgames;
    }

    async getBoardgameByTitle(title: string){
        const boardgame = await this.prisma.boardgame.findFirst({
            where: {
                name: title,
            }
        });

        if(!boardgame) throw new NotFoundException("Boardgame not found!")

        return boardgame;
    }

    async getBoardgameByPublisher(publisher: string){
        const boardgames = await this.prisma.boardgame.findMany({
            where: {
                publisher: publisher
            }
        });

        if(boardgames.length === 0) throw new NotFoundException("Publisher not found!")

        return boardgames;
    }

    async getBoardgameByCategory(category: string){
        const boardgames = await this.prisma.boardgame.findMany({
            where: {
                category: category
            }
        });
      
        if(boardgames.length === 0) throw new NotFoundException("Category not found!")

        return boardgames;

    }

    async addBoardgame(dto: CreateBoardgameDto){

        const checkBoardgame = await this.prisma.boardgame.findUnique({
            where: {
                name: dto.name
            }
        })

        if(checkBoardgame) throw new ForbiddenException("This Boardgame alredy exists!");

        const newBoardgame = await this.prisma.boardgame.create({
            data: {
                ...dto
            }
        });

        return newBoardgame;
    }

    async editBoardgame(id: number, dto: EditBoardgameDto){
        if("name" in dto){
           return await this.updateWithName(id, dto);
        }else{
           return await this.updateNoName(id, dto);
        }
    }

    async deleteBoardgame(id: number){
        await this.prisma.boardgame.delete({
            where: {
                id: id
            }
        })

        return "deleted";
    }

    async deleteBoardgameByTitle(title: string){
        await this.prisma.boardgame.delete({
            where: {
                name: title
            }
        });

        return "deleted by title";
    }

    async updateWithName(id:number, dto: EditBoardgameDto){
        const checkBoardgame = await this.prisma.boardgame.findUnique({
            where: {
                name: dto.name
            }
        })

        if(checkBoardgame) throw new ForbiddenException("This Boardgame alredy exists!");

        const boardgame = await this.prisma.boardgame.update({
            where: {
                id: id
            },
            data: {
                ...dto
            }
        });

        return boardgame;
    }

    async updateNoName(id: number, dto: EditBoardgameDto){
        const checkBoardgame = await this.prisma.boardgame.findUnique({
            where: {
                id: id
            }
        });
        
        const boardgame = await this.prisma.boardgame.update({
            where: {
                id: id
            },
            data: {
                name: checkBoardgame.name,
                ...dto
            }
        });

        return boardgame;
    }

}
