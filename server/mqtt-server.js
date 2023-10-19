const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');
const db = require('./database');

client.on('connect', () => {
  console.log('MQTT Server connected');
  client.subscribe('meter-data');
});

client.on('message', (topic, message) => {
    // Handle incoming MQTT messages and store data in the database
      try {
      const data = JSON.parse(message);
      const { charge_point_id, payload } = data;
      // Insert data into the SQLite database
      db.run(
        'INSERT INTO meter_data (charge_point_id, payload) VALUES (?, ?)',
        [charge_point_id, payload],
        (err) => {
          if (err) {
            console.error('Error storing data:', err);
          }
        }
      );
    } catch (error) {
      console.error('Error parsing MQTT message:', error);
    }
});

client.on('error', (error) => {
    console.error('MQTT Error:', error);
  });

