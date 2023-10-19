```markdown
# Pulse Energy Back-end Code Assignment

This project is designed to create a backend system for handling meter data records from MQTT clients and storing them in an SQLite database. It also provides API endpoints to retrieve the stored data.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm (Node Package Manager) are installed on your system.
- An MQTT broker (e.g., Mosquitto) is running and accessible at `mqtt://localhost:1883` or at the address you specify.
- SQLite is installed and available in your system.

## Installation

1. Clone or download the project repository from the provided link.

2. Open a terminal or command prompt and navigate to the project directory.

3. Install the project dependencies by running:

   ```bash
   npm install
   ```


## Usage


1. Start the Express server to receive and store MQTT data and provide API endpoints. It also starts the MQTT client to simulate sending data to the MQTT server:

   ```bash
   node index.js
   ```


## API Endpoints

1. **List Endpoint:** Retrieve data in a paginated format and filter by charge point IDs.

   - URL: `http://localhost:3000/api/list`
   - Query Parameters:
     - `page`: Page number for pagination (default is 1).
     - `perPage`: Number of records per page (default is 10).
     - `chargePointIds`: Comma-separated list of charge point IDs to filter by (optional).

2. **Detail Endpoint:** Retrieve complete data for a single record.

   - URL: `http://localhost:3000/api/detail/:recordId`
   - `:recordId` should be replaced with the ID of the record you want to view.

