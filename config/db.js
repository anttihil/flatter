import pgPromise from "pg-promise";

export const pgp = pgPromise({ capSQL: true });

const connection = {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  allowExitOnIdle: true,
};

const db = pgp(connection);

export default db;
