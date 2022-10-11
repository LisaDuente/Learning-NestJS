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
require('dotenv').config();


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: parseInt(process.env.PORT_DATABASE),
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      synchronize: true,
      logging: false,
      entities: [User, Tamagotchi, UserTama],
      migrations: [],
      subscribers: [],
      migrationsTableName: "migrations"
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
