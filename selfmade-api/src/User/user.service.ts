import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async editMe(userId: number, dto: EditUserDto){
        const user = await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                ...dto
            }
        })

        delete user.hash

        return user;
    }

    async deleteMe(userId: number){
        await this.prisma.user.delete({where: {
            id: userId
        }});

        return "You account was succesfully deleted!";
    }
}
