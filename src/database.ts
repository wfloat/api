import { DB } from "../prisma/generated/kysely.js";
import pg from "pg";
import { Kysely, PostgresDialect } from "kysely";

const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_DB = process.env.POSTGRES_DB;
const POSTGRES_PW = process.env.POSTGRES_PW;
const POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT!);
const POSTGRES_SERVICE_NAME = process.env.POSTGRES_SERVICE_NAME;

const dialect = new PostgresDialect({
  pool: new pg.Pool({
    database: POSTGRES_DB,
    host: POSTGRES_SERVICE_NAME,
    user: POSTGRES_USER,
    password: POSTGRES_PW,
    port: POSTGRES_PORT,
    max: 10,
  }),
});

export const db = new Kysely<DB>({
  dialect,
});
