const express = require('express');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const signals = {
  'SIGINT': 2,
  'SIGTERM': 15
};

app.get('/user', async (req, res) => {
  setTimeout(() => {
    console.log('ok');
    try {
      res.send('Success!').status(201);
    } catch (err) {
      res.send(err.message).status(500);
    }
  }, 25000);
});

app.get('/status', async (req, res) => {
  console.log('status');
  res.send('OK').status(200);
});

const server = app.listen(3000, () => console.log('Example app listening on port 3000!'));

const shutdown = (signal, value) => {
  server.close(function () {
    console.log('server stopped by ' + signal);
    process.exit(128 + value);
  });
}

Object.keys(signals).forEach(function (signal) {
  process.on(signal, () => {
    console.info(signal + ' signal received.');
    console.log('Closing http server.');
    shutdown(signal, signals[signal]);
  });
});
