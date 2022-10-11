import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { AdminAuthDto, UserAuthDto } from './dto';
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
        ){

    }

    async signUpAdmin(dto: AdminAuthDto){
        const hash = await argon.hash(dto.password);

        try {
            const admin = await this.prisma.admin.create({
                data: {
                    nickName: dto.nickname,
                    hash
                }
            });

            return this.signTokenAdmin(admin.id, admin.nickName);
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                //error for duplicate fields
                if(error.code === 'P2002'){}
                    throw new ForbiddenException('Admin already exists');
            }
            throw error;
        }
        
    }


    async signInAdmin(dto: AdminAuthDto){
        //search for admin
        const admin = await this.prisma.admin.findUnique({
            where: {
                nickName: dto.nickname
            }
        });

        //if you dont get an admin
        if(!admin) throw new ForbiddenException("Incorrect username");

        //returns true if admin.has and password matches
        const pwMatches = await argon.verify((await admin).hash, dto.password);

        if(!pwMatches) throw new ForbiddenException("Incorrect password");

        return this.signTokenAdmin(admin.id, admin.nickName);
    }


    async signUpUser(dto: UserAuthDto){

        const hash = await argon.hash(dto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash: hash,
                }
            });

            delete user.hash;

            return this.signTokenUser(user.id, user.email);

        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === "P2002"){
                    throw new ForbiddenException("User alredy exists");
                }
            }

            throw error
        }

    }

    async signInUser(dto: UserAuthDto){
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });

        if(!user) throw new ForbiddenException("Email does not exist!");

        const pwMatches = await argon.verify((await user).hash, dto.password);

        if(!pwMatches) throw new ForbiddenException("Password does not match!");
       
        return this.signTokenUser(user.id, user.email);

    }

    async signTokenUser(userId: number, email: string): Promise<{access_token: string}>{
        const payload = {
            sub: userId,
            email
        }

        const secret = this.config.get("JWT_SECRET_USER");

        //build the token with our data and user recognition (sub)
        const token = await this.jwt.signAsync(payload,{
            expiresIn: "15m",
            //will be put in env file
            secret: secret,

        })

      //return the token inside of an object
        return {
            access_token: token,
        }
    }

    async signTokenAdmin(adminId: number, nickname: string): Promise<{access_token: string}>{
        const payload = {
            sub: adminId,
            nickname
        }

        const secret = this.config.get("JWT_SECRET_ADMIN");

        //build the token with our data and user recognition (sub)
        const token = await this.jwt.signAsync(payload,{
            expiresIn: "15m",
            //will be put in env file
            secret: secret,

        })

      //return the token inside of an object
        return {
            access_token: token,
        }
    }
}
