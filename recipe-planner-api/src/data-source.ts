import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "api_fttj1bwzwbg8",
    password: "supersecret",
    database: "rpdb",
    synchronize: false,
    logging: false,
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/migration/**/*.ts"
    ],
    subscribers: ["src/subscriber/**/*.ts"
    ]
})
