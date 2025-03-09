 # Weather App - Real-Time MQTT Weather Station
 -> This project uses MQTT WebSockets to receive real-time temperature and humidity data, save it in a database, and display it using a web interface with live charts.

 # Setup
 ## Clone this repository.
-> git clone https://github.com/ashrafutuyubahe/Weather-app/
-> cd Weather-app

## Install dependencies:


npm install
## run the server
npm run dev
This will start the server on http://localhost:3001.
and display the index.html file within browser and see  amazing staff

 # Features
 
MQTT Integration: Subscribes to MQTT topics for temperature and humidity.
Real-Time Data: Displays the latest temperature and humidity on a webpage.
Chart.js: Visualizes the data on a real-time graph.
API: Provides averaged data for displaying in graphs.


 # Project Structure
 
Server.js: Sets up the Express server, MQTT client, and API routes.
Fronted/index.html: The front-end interface displaying data.
Model/Record.js: Saves and retrieves the data from the database.
Config/database.js: the database setup

MQTT Broker
The application connects to the MQTT broker at ws://157.173.101.159:9001 and subscribes to:

/work_group_01/room_temp/temperature
/work_group_01/room_temp/humidity


