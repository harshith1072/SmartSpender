const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const { server } = require('./environment.js'); // Import the backend URL

const app = express();
var userid = '4';
const webhook = require('./webhook.js');

const { Webhook } = require('svix');
require('dotenv').config();
const PORT = process.env.PORT;

// Middleware setup
app.use(express.json());
app.use(cors());

// Dynamically register routes
readdirSync('./routes').map((route) => {
  const routePath = `/api/v1/${route}`; 
 
  app.use(routePath, (req, res, next) => {
 
    const externalUrl = `${server}${routePath}`;
    console.log('Forwarding request to:', externalUrl);
 
    next();
  });

  app.use(routePath, require('./routes/' + route));
});
 
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});
 
const startServer = () => {
  db();  
  app.listen(PORT, () => {
    console.log('Server listening on port:', PORT);
  });
};

 
startServer();
