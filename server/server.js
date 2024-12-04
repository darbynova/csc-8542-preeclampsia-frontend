const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

let bloodPressureData = null;

app.post('/ihealth-callback', (req, res) => {
  console.log('Received blood pressure data:', req.body);
  bloodPressureData = req.body; // Store the received data in memory
  res.status(200).json({ success: true, message: 'Data received', data: req.body });
});

app.get('/get-blood-pressure', (req, res) => {
  if (bloodPressureData) {
    res.status(200).json({ success: true, data: bloodPressureData });
  } else {
    res.status(404).json({ success: false, message: 'No data available' });
  }
});

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
