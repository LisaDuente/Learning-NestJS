import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategyUser } from './strategyUser';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyAdmin } from './strategyAdmin';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    imports: [JwtModule.register({}),],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategyUser, JwtStrategyAdmin, PrismaService]
})
export class AuthModule {}
