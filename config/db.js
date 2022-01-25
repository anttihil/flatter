import pgPromise from "pg-promise";

const connection = {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  allowExitOnIdle: true,
  capSQL: true,
};

export const db = pgp(connection);

export default db;
