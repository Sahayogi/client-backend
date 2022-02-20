//  imports
require('dotenv').config({ path: './config.env' });
const express = require('express');
const connectDb = require('./config/db');
const errorHandler = require('./middleware/error');
const cors = require('cors');

connectDb();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.use('/api/login', require('./routes/auth'));
app.use('/api/wallet', require('./routes/wallet'));
app.use('/api/project', require('./routes/project'));

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  // res.setHeader(
  //   'Access-Control-Allow-Headers',
  //   'access_token,refresh_token,X-Requested-With,content-type'
  // );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
// Error handler should be last piece of middleware
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});

// Handle crashed
process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
