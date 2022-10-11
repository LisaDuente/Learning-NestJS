import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Tamagotchi } from './entity/Tamagotchi';
import { UserTama } from './entity/UserTama';
import { User } from './entity/User';
import { UserModule } from './user/user.module';
import { TamagotchiModule } from './tamagotchi/tamagotchi.module';
import { UserTamaModule } from './user-tama/user-tama.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5436,
      username: "admin",
      password: "123",
      database: "lisasDb",
      synchronize: true,
      logging: false,
      entities: [User, Tamagotchi, UserTama],
      migrations: [],
      subscribers: [],
  }),
  TypeOrmModule.forFeature([User, Tamagotchi, UserTama]),
  UserModule,
  TamagotchiModule,
  UserTamaModule,
  UserTamaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
