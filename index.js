const express = require('express');
const app = express();
const router = express.Router();
const http = require('http').createServer(app);
const port = process.env.PORT || 3000;
router.get('/download-report', (req, res) => {
  res.end();
});
router.get('/generate-report', (req, res) => {
  const { startDate, endDate, deviceType } = req.query;
  console.log(
    `startDate: ${startDate}; endDate: ${endDate}; deviceType: ${deviceType};`
  );
  res.sendStatus(200);
  res.end();
});
app.use('/api/', router);
http.listen(port, () => {
  console.log(`listening on *:${port}`);
});