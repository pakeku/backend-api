const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

// endpoint to return top level api
// much like a switch statement
app.get('/', async (req, res) => {
  res.send({
    message: "Storefront API. See documentation for use."
  });
});

app.use('/stores', require('./routes/storesRoutes'))

module.exports = {
  app
}

