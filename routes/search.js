const express = require('express');
const router = express.Router();
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.resolve(__dirname, '../db/freakyfashion.db');
const db = new Database(dbPath);

router.get('/', (req, res) => {
  const query = req.query.q;
  let products = [];

  if (query) {
    products = db.prepare(`
      SELECT * 
      FROM products 
      WHERE name LIKE ?
    `).all(`%${query}%`);
  }

  res.render('search', {
    title: 'Sökresultat',
    query: query,
    products: products,
    productCount: products.length
  });
});

module.exports = router;