const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./weather.db', (err) => {
    if (err) console.error('Database connection error:', err);
    else console.log('Connected to SQLite database');
});

// Create table for storing weather data
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS weather_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            temperature REAL,
            humidity REAL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

module.exports = db;
