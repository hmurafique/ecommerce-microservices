const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'ecommerce'
});

const app = express();
app.use(bodyParser.json());

app.post('/api/order', async (req, res) => {
  const { userId='guest', items=[] } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const insert = 'INSERT INTO orders(user_id, items) VALUES($1,$2) RETURNING id';
    const r = await client.query(insert, [userId, JSON.stringify(items)]);
    await client.query('COMMIT');
    res.json({ orderId: r.rows[0].id });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'failed' });
  } finally { client.release(); }
});

app.get('/api/orders', async (req, res) => {
  const r = await pool.query('SELECT * FROM orders ORDER BY id DESC LIMIT 20');
  res.json(r.rows);
});

app.listen(3002, ()=>console.log('Order service on 3002'));
