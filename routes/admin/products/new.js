const express = require('express');
const router = express.Router();
const multer = require('multer');
const Database = require('better-sqlite3');
const db = new Database('./db/freakyfashion.db', { verbose: console.log });
const path = require('path');


router.get('/', function (req, res) {
  res.render('admin/products/new', { title: 'Administration' });
});

router.post('/', upload.single('image'), function (req, res) {
  const publicationDate = req.body.publicationDate;
  const isNew = (new Date() - new Date(publicationDate)) <= (7 * 24 * 60 * 60 * 1000) ? 1 : 0;

  const product = {
    name: req.body.name,
    description: req.body.description,
    image: req.file ? '/images/' + req.file.filename : null,
    brand: req.body.brand,
    sku: req.body.sku,
    price: req.body.price,
    publicationDate: req.body.publicationDate,
    slug: generateSlug(req.body.name),
    isNew: isNew
  };

  try {
    db.prepare(`
      INSERT INTO products (name, description, image, brand, sku, price, publicationDate, slug, isNew)
      VALUES (@name, @description, @image, @brand, @sku, @price, @publicationDate, @slug, @isNew)
    `).run(product);

    res.status(201).json({ message: "Produkten har lagts till" });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      res.status(400).json({ error: "Det finns redan en produkt med detta SKU" });
    }
  }
});


module.exports = router;