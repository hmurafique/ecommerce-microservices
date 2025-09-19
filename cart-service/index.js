const express = require('express');
const bodyParser = require('body-parser');
const Redis = require('ioredis');

const redis = new Redis({ host: process.env.REDIS_HOST || 'redis', port: 6379 });
const app = express();
app.use(bodyParser.json());

// simple per-user cart keyed by "cart:{userId}" — for demo we'll use fixed user id "guest"
const USER = "guest";

app.get('/api/cart', async (req, res) => {
  const items = await redis.lrange(`cart:${USER}`, 0, -1);
  res.json(items.map(i=>JSON.parse(i)));
});

app.post('/api/cart', async (req, res) => {
  const { productId } = req.body;
  // push minimal item
  await redis.rpush(`cart:${USER}`, JSON.stringify({ productId, ts: Date.now() }));
  res.status(201).json({ ok:true });
});

app.listen(3001, ()=>console.log('Cart service on 3001'));
