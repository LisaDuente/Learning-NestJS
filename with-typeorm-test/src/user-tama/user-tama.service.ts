import { Injectable } from '@nestjs/common';
import { UserTama } from '../entity/UserTama';
import { TamagotchiService } from '../tamagotchi/tamagotchi.service';

@Injectable()
export class UserTamaService {
    constructor(private tamaService: TamagotchiService){}

    getCount(userId: number){
        return UserTama.countBy({userId: userId})
    }

    async countByProduct(userId: number, tamaName: string){
        let tama = await this.tamaService.getTamaByName(tamaName)
        return UserTama.countBy(
            {   userId: userId,
                tamaId: tama.id
            }
        )
    }

    async missingInCollection(userId: number){
        let allTamaIds: Set<number> = new Set();
        let idArray = (await this.tamaService.getAll()).map((tama) => tama.id)
        
        for(let id of idArray){
            allTamaIds.add(id)
        }
        
        let allUserTamaIds = await UserTama.findBy({userId: userId})

        allUserTamaIds.map((tama) => {
            if(allTamaIds.has(tama.tamaId)){
                allTamaIds.delete(tama.tamaId)
            }
        })

        let missingTamas = []
        for(let tamaId of allTamaIds){
            missingTamas.push(await this.tamaService.getById(tamaId))
        }

        return missingTamas

    }

    getAllTamas(userId: number){
        return UserTama.findAllTamas(userId)
    }
}
