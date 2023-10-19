const fs = require('fs');
const mqtt = require('mqtt');

const clientData = require('csv-parser');
const client = mqtt.connect('mqtt://localhost');

const csvFile = 'data/meter_data.csv';

fs.createReadStream(csvFile)
  .pipe(clientData())
  .on('data', (row) => {
    // Simulate sending data to MQTT server with a random delay
    setTimeout(() => {
      const message = JSON.stringify(row);
      client.publish('meter-data', message);
      console.log(`Sent data for charge point ${row.charge_point_id}`);
    }, Math.floor(Math.random() * 6) * 1000); // Random delay between 0-5 seconds
  });
