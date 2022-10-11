import { Injectable } from '@nestjs/common';
import { find } from 'rxjs';
import { Tamagotchi } from '../entity/Tamagotchi';
import { User } from '../entity/User';
import { UserTama } from '../entity/UserTama';
import { UserDto } from './dto/User.dto';

@Injectable()
export class UserService {
    constructor(){}

    getAll(){
        return User.find();
    }

    async addUser(dto: UserDto){
        return User.save(dto)
    }

   /* async deleteTama(userId: number, tamas: Tamagotchi[]){
        let user = await User.find({relations: {tamagotchi: true}, where: {id: userId}})
  
        user[0].tamagotchi = user[0].tamagotchi.filter((tama) => tama.name != tamas[0].name)

        return User.save(user)

    }
*/
    async addTamaToUser(userId: number, tamaArray: Tamagotchi[]){
        //look for all the tamas the user already has
        console.log(tamaArray)
        let tamasToAdd = []
        let user = await User.findOneBy({id: userId})

        //find the tamagotchi the user wants to add
        for(let tama of tamaArray){
            tamasToAdd.push(await Tamagotchi.findOneBy({name: tama.name}))
        }

        console.log(tamasToAdd)

        //create a new entry for UserTama if Tama is in Tamagotchi table
        for(let tama of tamasToAdd){
            let userTama = new UserTama()
            userTama.tamaId = tama.id
            userTama.userId = userId
            userTama.tama = tama
            userTama.user = user
            await UserTama.save(userTama)
        } 
    }
}
