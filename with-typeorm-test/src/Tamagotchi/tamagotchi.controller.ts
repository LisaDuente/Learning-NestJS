import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AddTamaDto } from './dto/addTama.dto';
import { TamagotchiService } from './tamagotchi.service';

@Controller('tamagotchi')
export class TamagotchiController {
    constructor(private service: TamagotchiService){}

    @Post("add")
    addTama(@Body() dto: AddTamaDto){
        return this.service.addTama(dto)
    }
}
