import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BoardgameController } from './boardgame.controller';
import { BoardgameService } from './boardgame.service';

@Module({
  controllers: [BoardgameController],
  providers: [BoardgameService, PrismaService]
})
export class BoardgameModule {}
