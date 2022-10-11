import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient{
    //tell prismaService from where to fetch the data
    constructor(config:ConfigService){
        super({
            datasources: {
                db: {
                    url: config.get("DATABASE_URL"),
                }
            }
        })
    }

    cleanDB(){
        return this.$transaction([
            this.admin.deleteMany(),
            this.boardgamesForUsers.deleteMany(),
            this.user.deleteMany(),
            this.boardgame.deleteMany()
        ]);
        
    }
}
