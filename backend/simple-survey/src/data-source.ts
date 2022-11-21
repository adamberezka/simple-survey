import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  logging: false,
  ssl: { rejectUnauthorized: false },
  entities: [
    "src/entities/**/*.{ts,js}"
  ],
  migrations: [],
  subscribers: []
})