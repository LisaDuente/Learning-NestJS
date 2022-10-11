import { Body, Controller, Get, Patch } from '@nestjs/common';
import { get } from 'http';
import { brotliDecompressSync } from 'zlib';
import { Tamagotchi } from '../entity/Tamagotchi';
import { User } from '../entity/User';
import { UserTama } from '../entity/UserTama';
import { GetDto } from './dto/getThings.dto';
import { UpdateTamaDto } from './dto/updateTama.dto';
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

    @Patch("/updateCondition")
    updateCondition(@Body() entry: UpdateTamaDto, ){
        return this.service.updateCondition(entry.entryId, entry.condition)
    }
}
