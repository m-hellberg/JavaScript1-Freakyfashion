const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.get('/', function(req, res, next) {
  const sql = `
    SELECT name,
           brand,
           price,
           image,
           slug,
           publicationDate,
           isNew
    FROM products
    WHERE publicationDate <= DATE('now')
    LIMIT 8;
  `;

  try {
    const rows = db.prepare(sql).all();
    
    res.render('index', {
      title: 'Freaky Fashion',
      products: rows
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Serverfel');
  }
});

module.exports = router;