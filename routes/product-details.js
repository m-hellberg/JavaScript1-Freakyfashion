const express = require('express');
const router = express.Router();
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.resolve(__dirname, '../db/freakyfashion.db');
const db = new Database(dbPath);

router.get('/:slug', (req, res) => {
    const slug = req.params.slug;

    const productQuery = db.prepare(`
        SELECT * FROM products
        WHERE slug = ?
    `);
    const product = productQuery.get(slug);

    if (!product) {
        return res.status(404).render('404', { message: 'Produkt hittades inte' });
    }

    const similarProductsQuery = db.prepare(`
        SELECT * FROM products
        WHERE slug != ?
        ORDER BY RANDOM()
        LIMIT 9
    `);
    const similarProducts = similarProductsQuery.all(slug);

    // rendera vy
    res.render('product-details', {
        title: 'Om produkten',
        product,
        similarProducts
    });
});

module.exports = router;