const mqttClient = mqtt.connect('ws://157.173.101.159:9001');

mqttClient.on('connect', () => {
    console.log("Connected to MQTT broker");
    mqttClient.subscribe("/work_group_01/room_temp/temperature");
    mqttClient.subscribe("/work_group_01/room_temp/humidity");
});

mqttClient.on('message', (topic, message) => {
    const value = message.toString();

    if (topic === "/work_group_01/room_temp/temperature") {
        document.getElementById("temp").innerText = value;
    } else if (topic === "/work_group_01/room_temp/humidity") {
        document.getElementById("humidity").innerText = value;
    }
});

const ctx = document.getElementById('weatherChart').getContext('2d');
const weatherChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Temperature (°C)',
                borderColor: '#FF5733',
                data: [],
                fill: false
            },
            {
                label: 'Humidity (%)',
                borderColor: '#33B5E5',
                data: [],
                fill: false
            }
        ]
    },
    options: {
        scales: {
            x: { display: true },
            y: { display: true }
        }
    }
});

// I am fetching averaged data every 5 seconds
const fetchData = async () => {
    const response = await fetch('http://localhost:3001/api/data');
    const data = await response.json();

    weatherChart.data.labels = data.map(d => d.time);
    weatherChart.data.datasets[0].data = data.map(d => d.avg_temp);
    weatherChart.data.datasets[1].data = data.map(d => d.avg_humidity);
    weatherChart.update();
};

setInterval(fetchData, 5000);
fetchData();
