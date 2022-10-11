import { Module } from '@nestjs/common';
import { TamagotchiService } from '../tamagotchi/tamagotchi.service';
import { UserTamaController } from './user-tama.controller';
import { UserTamaService } from './user-tama.service';

@Module({
  controllers: [UserTamaController],
  providers: [UserTamaService, TamagotchiService]
})
export class UserTamaModule {}
