const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres.fvpzutavpzjjwyjxexym:9f9l3AkHJgSnNDbr@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true",
});

const db = {
  query: async (text, params) => {
    const res = await pool.query(text, params);
    return [res.rows, res.fields];
  },
  execute: async (text, params) => {
    const res = await pool.query(text, params);
    return [res.rows, res.fields];
  }
};

module.exports = db;
