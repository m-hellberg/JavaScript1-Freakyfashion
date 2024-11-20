// Ladda `better-sqlite3`-modulen
const Database = require('better-sqlite3');
const path = require('path');

// Ta fram absolut sökväg till databasfilen
const dbFilePath = path.resolve(process.cwd(), './db/freakyfashion.db');

// Skapa db-objektet
const db = new Database(dbFilePath, { readonly: false }); // Kan också vara { readonly: true } om du vill ha skrivskydd

// Exportera db-objektet så att det kan importeras i andra moduler
module.exports = db;