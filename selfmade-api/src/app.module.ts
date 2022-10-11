import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { BoardgameModule } from './boardgame/boardgame.module';
import { UserModule } from './user/user.module';
import { BoardgameForUserModule } from './BoardgameForUser/boardgame-for-user.module';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({isGlobal: true}),
    BoardgameModule,
    UserModule,
    BoardgameForUserModule
  ],
})
export class AppModule {}
