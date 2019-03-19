import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import contactRoutes from './server/routes/contactRoutes';
import smsRoutes from './server/routes/smsRoutes';

import './config/database';

const app = express();

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use('/api/v1', contactRoutes);
app.use('/api/v1', smsRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('Server running on port 8080');
});

module.exports = app;