const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres.fvpzutavpzjjwyjxexym:9f9l3AkHJgSnNDbr@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true",
});

async function migrate() {
  try {
    console.log("Running migrations...");

    await pool.query(`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS google_id VARCHAR(255) UNIQUE,
      ADD COLUMN IF NOT EXISTS reset_token VARCHAR(255),
      ADD COLUMN IF NOT EXISTS reset_token_expiry TIMESTAMP;
    `);

    console.log("Added google_id, reset_token, reset_token_expiry columns to users table");

    await pool.query(`
      ALTER TABLE Blog
      ADD COLUMN IF NOT EXISTS cover_image TEXT;
    `);
    console.log("Added cover_image column to Blog table");

    await pool.query(`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;
    `);
    console.log("Added is_admin column to users table");

    console.log("Migration complete!");
  } catch (error) {
    console.error("Migration error:", error);
  } finally {
    await pool.end();
  }
}

migrate();
