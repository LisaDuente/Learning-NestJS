import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BoardgameForUserController } from './boardgame-for-user.controller';
import { BoardgameForUserService } from './boardgame-for-user.service';

@Module({
    imports: [HttpModule],
    controllers: [BoardgameForUserController],
    providers: [BoardgameForUserService, PrismaService]
})
export class BoardgameForUserModule {}
