CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id TEXT,
  items JSONB,
  created_at TIMESTAMP DEFAULT now()
);
