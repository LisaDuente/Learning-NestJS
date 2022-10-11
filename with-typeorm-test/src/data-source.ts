import "reflect-metadata"
import { DataSource } from "typeorm"
import { Tamagotchi } from "./entity/Tamagotchi"
import { User } from "./entity/User"
import { UserTama } from "./entity/UserTama"
require('dotenv').config()

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: parseInt(process.env.PORT_DATABASE),
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    logging: false,
    entities: ["src/entity/**/*{.ts,.js"],
    migrations: ["src/migration/**/*{.ts,.js}"],
    subscribers: [],
    migrationsTableName: "migrations"
})

//to run migration: npx typeorm-ts-node-commonjs migration:run -d "src\data-source.ts"