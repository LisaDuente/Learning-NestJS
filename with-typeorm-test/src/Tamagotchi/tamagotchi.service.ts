import { Injectable } from '@nestjs/common';
import { Tamagotchi } from '../entity/Tamagotchi';
import { AddTamaDto } from './dto/addTama.dto';

@Injectable()
export class TamagotchiService {

    addTama(dto: AddTamaDto){
        return Tamagotchi.save({...dto})
    }

    getTamaByName(name: string){
        return Tamagotchi.findOneBy({name: name})
    }

    getAll(){
        return Tamagotchi.find()
    }

    getById(id: number){
        return Tamagotchi.findBy({id: id})
    }
}
