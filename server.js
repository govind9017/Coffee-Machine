const express = require('express');
const MuseumAttendence = require('./models/museumAttedance');
const app = express();
const port = 3000;

app.get('/api/visitors', async(req, res) => {
  try {
    const query = req && req.query;
    const output = await new MuseumAttendence().getMontlyAttendanceDetails(query);
    res.send(output);
  } catch(err) {
    res.status(err.statusCode || 500).send(err.message);
  }
})

app.listen(port, () => {
  console.log("Express app listening on port :: ", port);
})