const express = require('express');
const db = require('./database');
const router = express.Router();

// List endpoint: Return paginated data and filter by charge point ids
router.get('/list', (req, res) => {
  const { page, pageSize, chargePointIds } = req.query;
  const offset = (page - 1) * pageSize;
  let query = 'SELECT * FROM meter_data';

  if (chargePointIds) {
    const ids = chargePointIds.split(',').map(id => `'${id}'`).join(',');
    query += ` WHERE charge_point_id IN (${ids})`;
  }

  query += ` ORDER BY timestamp DESC LIMIT ${pageSize} OFFSET ${offset}`;

  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    const finalRows = rows.map(row => ({
        id: row.id,
        charge_point_id: row.charge_point_id,
        meterValue: JSON.parse(row.payload).meterValue
      }));
      
    res.json(finalRows);
  });
});

// Detail endpoint: Return complete data for a single record
router.get('/detail/:recordId', (req, res) => {
  const recordId = req.params.recordId;
  const query = 'SELECT * FROM meter_data WHERE id = ?';

  db.get(query, [recordId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!row) {
      res.status(404).json({ error: 'Record not found' });
      return;
    }
    row.payload = JSON.parse(row.payload);
      
    res.json(row);
  });
});

module.exports = router;
