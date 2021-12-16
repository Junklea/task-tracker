const { Pool } = require("pg");

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnAuthorized: false,
      },
    }
  : {
      user: "postgres",
      password: "postgres",
      host: "localhost",
      port: 5432,
      database: "taskdb",
    };

const pool = new Pool(poolConfig);
module.exports = {
  async query(text, params) {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("executed query", {
      text,
      params,
      duration,
      rows: res.rowCount,
    });
    return res;
  },
};
