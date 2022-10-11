import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../../prisma/prisma.service";



@Injectable()
export class JwtStrategyUser extends PassportStrategy(Strategy, "user"){
    constructor(config: ConfigService, private prisma: PrismaService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get("JWT_SECRET_USER"),
        })
    }

    //this payload is the user with an exp date inside of and here we append it to the request body
    async validate(payload: {sub: number, email: string}){
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub,
            }
        })

        delete user.hash;
        
        return user;
    }


}