const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');
const db = new Database('./db/freakyfashion.db', { verbose: console.log });

router.get('/', (req, res) => {
  res.render('admin/products', { title: 'Administration' });
});

router.get('/api/products', (req, res) => {
  const rows = db.prepare(`
    SELECT id,
           name,
           sku,
           price
      FROM products
  `).all();
  res.json(rows);
});
 
router.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  
  db.prepare(`
    DELETE FROM products WHERE id = ?
  `).run(productId);

  res.status(200).send();
});

module.exports = router;