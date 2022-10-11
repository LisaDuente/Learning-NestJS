import { Body, Controller, Get } from '@nestjs/common';
import { get } from 'http';
import { brotliDecompressSync } from 'zlib';
import { User } from '../entity/User';
import { GetDto } from './dto/getThings.dto';
import { UserTamaService } from './user-tama.service';

@Controller('user-tama')
export class UserTamaController {
    constructor(private service: UserTamaService){}

    @Get("/getTotalCount")
    getCount(@Body() dto: GetDto){
        return this.service.getCount(dto.userId)
    }

    @Get("/getCountByProduct")
    getCountByProduct(@Body() dto: GetDto){
        return this.service.countByProduct(dto.userId, dto.tamaName)
    }

    @Get("/missingInCollection")
    getMissing(@Body() dto: GetDto){
        return this.service.missingInCollection(dto.userId)
    }

    @Get("/getAllTamasByUser")
    getAllTamas(@Body() user: Partial<User>){
        return this.service.getAllTamas(user.id)
    }
}
