
const db= require("../Config/database")

const saveData = (temperature, humidity) => {
    const stmt = `INSERT INTO weather_data (temperature, humidity) VALUES (?, ?)`;
    db.run(stmt, [temperature, humidity], (err) => {
        if (err) console.error('Error saving data:', err);
        else console.log('Data saved:', { temperature, humidity });
    });
};

const getAveragedData = (callback) => {
    const stmt = `
        SELECT 
            strftime('%Y-%m-%d %H:%M', timestamp) as time,
            AVG(temperature) as avg_temp,
            AVG(humidity) as avg_humidity
        FROM weather_data
        GROUP BY time
        ORDER BY time DESC
        LIMIT 20
    `;
    db.all(stmt, [], (err, rows) => {
        if (err) {
            console.error('Error fetching data:', err);
            callback([]);
        } else {
            callback(rows);
        }
    });
};

module.exports = { saveData, getAveragedData };
