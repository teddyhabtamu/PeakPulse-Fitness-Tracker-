const mysql = require('mysql2/promise');
const fs = require('fs');

async function extractData() {
  console.log('Connecting to MySQL database...');
  const pool = mysql.createPool({
    host: "mysql-teddy.alwaysdata.net",
    user: "teddy",
    password: "1234tttt@#@#",
    database: "teddy_fitness_tracker",
    port: 3306,
    connectionLimit: 10,
  });

  const dump = {
    tables: {},
  };

  try {
    const [tablesRow] = await pool.query('SHOW TABLES');
    const tables = tablesRow.map(row => Object.values(row)[0]);
    console.log(`Found tables: ${tables.join(', ')}`);

    for (const table of tables) {
      console.log(`Extracting data for table: ${table}...`);
      
      const [schema] = await pool.query(`DESCRIBE ${table}`);
      const [rows] = await pool.query(`SELECT * FROM ${table}`);
      
      dump.tables[table] = {
        schema: schema,
        data: rows,
      };
      console.log(`- ${rows.length} rows extracted.`);
    }

    fs.writeFileSync('database_dump.json', JSON.stringify(dump, null, 2));
    console.log('Data successfully saved to database_dump.json!');
  } catch (err) {
    console.error('Error extracting data:', err);
  } finally {
    await pool.end();
  }
}

extractData();
