import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../../prisma/prisma.service";



@Injectable()
export class JwtStrategyAdmin extends PassportStrategy(Strategy, "admin"){
    constructor(config: ConfigService, private prisma: PrismaService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get("JWT_SECRET_ADMIN"),
        })
    }

    //this payload is the user with an exp date inside of and here we append it to the request body
    async validate(payload: {sub: number, nickname: string}){
        const admin = await this.prisma.admin.findUnique({
            where: {
                id: payload.sub,
            }
        })

        //delete admin.hash;
        
        return admin;
    }


}