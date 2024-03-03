// server.js

const express = require("express");
const bodyParser = require("body-parser");
const pg = require("pg");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
const port = 5000;
dotenv.config();

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/records", async (req, res) => {
  try {
    const { page = 1, pageSize = 20, search, sortBy } = req.query;
    const offset = (page - 1) * pageSize;
    let query = `SELECT * FROM records`;

    if (search) {
      query += ` WHERE customer_name ILIKE '%${search}%' OR location ILIKE '%${search}%'`;
    }

    if (sortBy === "date") {
      query += ` ORDER BY DATE(created_at)`;
    } else if (sortBy === "time") {
      query += ` ORDER BY created_at::time`;
    }

    query += ` LIMIT ${pageSize} OFFSET ${offset}`;

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/records/count", async (req, res) => {
  try {
    const { search } = req.query;
    let query = `SELECT COUNT(*) FROM records`;

    if (search) {
      query += ` WHERE customer_name ILIKE '%${search}%' OR location ILIKE '%${search}%'`;
    }

    const result = await pool.query(query);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
