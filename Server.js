const express = require('express');
const cors = require('cors');
const mqtt = require('mqtt');
const { saveData, getAveragedData } = require('./Model/Record');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public'));

// MQTT Configuration
const mqttClient = mqtt.connect('ws://157.173.101.159:9001');

mqttClient.on('connect', () => {
    console.log("Connected to MQTT broker");
    mqttClient.subscribe("/work_group_01/room_temp/temperature");
    mqttClient.subscribe("/work_group_01/room_temp/humidity");
});

let temperature = null;
let humidity = null;

mqttClient.on('message', (topic, message) => {
    const value = parseFloat(message.toString());
    
    if (topic === "/work_group_01/room_temp/temperature") {
        temperature = value;
    } else if (topic === "/work_group_01/room_temp/humidity") {
        humidity = value;
    }

    if (temperature !== null && humidity !== null) {
        saveData(temperature, humidity);
        temperature = null;
        humidity = null;
    }
});

// API to get averaged data for real-time graph
app.get('/api/data', (req, res) => {
    getAveragedData((data) => {
        res.json(data);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

