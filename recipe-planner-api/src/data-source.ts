import "reflect-metadata"
import { DataSource } from "typeorm"
console.log("!!!!!!!",__dirname + "/entities/**/*.ts")
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "adminpass",
    database: "mydb",
    synchronize: false,
    logging: false,
    entities: [__dirname + "/entities/*.ts"],
    migrations: [],
    subscribers: [],
})