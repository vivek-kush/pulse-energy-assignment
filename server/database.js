const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./meter_data.db');

// Create a table to store meter data
db.run(`
  CREATE TABLE IF NOT EXISTS meter_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    charge_point_id TEXT,
    payload TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;
