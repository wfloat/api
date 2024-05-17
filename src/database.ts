import { DB } from "../prisma/generated/kysely.js";
import pg from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { Context } from "./context.js";
import { PrismaModel, createLoaders } from "./loaders.js";
// import { Session } from "./bootstrap";
export const PAGE_LIMIT = 100;

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

type MakeNullablePropertiesOptional<T> = {
  [P in keyof T as null extends T[P] ? P : never]?: Exclude<T[P], null> | null | undefined;
} & {
  [P in keyof T as null extends T[P] ? never : P]: T[P];
};

export async function create<T1 extends keyof DB & string, T2 extends PrismaModel<T1>>(
  tableName: T1,
  context: Context,
  input: MakeNullablePropertiesOptional<
    Omit<T2, "id" | "createdById" | "updatedById" | "createdDate" | "updatedDate" | "isDeleted">
  >
) {
  // const me = context.me;
  // if (!me) {
  //   throw Error(`User sesssion not established.`);
  // }

  const inputAny = input as any;
  inputAny.id = undefined;
  // inputAny.createdDate = new Date();
  // inputAny.updatedDate = new Date();
  // inputAny.createdById = me.id;
  // inputAny.updatedById = me.id;
  // inputAny.isDeleted = false;

  const result = await db
    .insertInto(tableName)
    .values(inputAny)
    .returning(["id"])
    .executeTakeFirstOrThrow();

  const loaderName = tableName as keyof ReturnType<typeof createLoaders>;

  const row = (await context.loaders[loaderName].load(result.id)) as T2;

  if (!row) {
    throw Error(`Failed to create new ${tableName}.`);
  }

  return row;
}

export async function update<T1 extends keyof DB & string, T2 extends PrismaModel<T1>>(
  tableName: T1,
  context: Context,
  input: Partial<
    Omit<T2, "createdById" | "updatedById" | "createdDate" | "updatedDate" | "isDeleted">
  >
) {
  // const me = context.me;
  // if (!me) {
  //   throw Error(`User sesssion not established.`);
  // }

  const inputAny = input as any;
  // inputAny.updatedDate = new Date();
  // inputAny.updatedById = me.id;

  const id = inputAny.id;
  inputAny.id = undefined;

  const result = await db
    .updateTable(tableName)
    .set(inputAny)
    .where("id", "=", id)
    .executeTakeFirstOrThrow();

  const loaderName = tableName as keyof ReturnType<typeof createLoaders>;

  const row = (await context.loaders[loaderName].load(id)) as T2;

  if (!row) {
    throw Error(`${tableName} not found with id: ${id}.`);
  }

  return row;
}
