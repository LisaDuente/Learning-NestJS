import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEntryDto } from "./dto"

@Injectable()
export class BoardgameForUserService {
    constructor(private prisma: PrismaService, private httpService: HttpService){}

    async callSwapiPeople(){
        const people = await this.httpService.get("https://swapi.dev/api/people")
        console.log(people);
    }

    getAllGamesForUser(userId: number){

    }

    getTitleForUser(userId: number, title: string){

    }

    getLatestEntryForUser(userId: number){

    }

    getCategoryForUser(userId: number, category: string){

    }

    getPublisherForUser(userId: number, publisher: string){

    }

    getCountGamesForUser(userId: number){

    }

    async addEntry(userId: number, dto: CreateEntryDto){
        //check if boardgame exists
        const boardgame = await this.prisma.boardgame.findUnique({
                where: {
                    id: dto.boardgameId
                }
            });

        const user = this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!boardgame) throw new NotFoundException("Boardgame doesn't exist")

       /*const entry = await this.prisma.boardgamesForUsers.create({
            data: {
                ...dto
            }
        })*/
    }

    deleteEntry(userId: number, boardgameId: number){

    }
}
