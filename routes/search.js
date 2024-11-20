const express = require('express');
const router = express.Router();
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.resolve(__dirname, '../db/freakyfashion.db');
const db = new Database(dbPath);



module.exports = router;