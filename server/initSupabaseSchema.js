const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://postgres.fvpzutavpzjjwyjxexym:9f9l3AkHJgSnNDbr@aws-0-eu-west-1.pooler.supabase.com:5432/postgres",
});

async function initSchema() {
  try {
    console.log("Connecting to Supabase...");
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("Created users table");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS Workout (
        workout_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
        category VARCHAR(255),
        workout_name VARCHAR(255),
        sets INTEGER,
        reps INTEGER,
        weight DECIMAL,
        duration INTEGER,
        date TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("Created Workout table");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS DailyStat (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
        calories_burned DECIMAL,
        date DATE
      );
    `);
    console.log("Created DailyStat table");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS WeeklyStat (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
        calories_burned DECIMAL,
        week_start_date DATE
      );
    `);
    console.log("Created WeeklyStat table");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS WorkoutStat (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
        calories_burned DECIMAL,
        date TIMESTAMP
      );
    `);
    console.log("Created WorkoutStat table");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS Blog (
        blog_id SERIAL PRIMARY KEY,
        author_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("Created Blog table");

    console.log("Schema initialization successful!");
  } catch (error) {
    console.error("Error creating schema:", error);
  } finally {
    await pool.end();
  }
}

initSchema();
