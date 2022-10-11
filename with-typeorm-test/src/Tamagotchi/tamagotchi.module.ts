import { Module } from '@nestjs/common';
import { TamagotchiService } from './tamagotchi.service';
import { TamagotchiController } from './tamagotchi.controller';

@Module({
  providers: [TamagotchiService],
  controllers: [TamagotchiController]
})
export class TamagotchiModule {}
