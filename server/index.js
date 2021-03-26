const express = require('express');
const path = require('path');
const compression = require('compression');
const cors = require('cors');

const PORT = 3000;
const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(cors());

app.get('/loaderio-b30250110d0bc9864253940e1054289a', (req, res) => {
  res.sendFile('./loaderio-b30250110d0bc9864253940e1054289a.txt');
});

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${3000}!`);
});
