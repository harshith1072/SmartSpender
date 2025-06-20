const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()
var userid='4';
const webhook=require('./webhook.js');
 
const { Webhook } = require('svix');
require('dotenv').config()
const PORT = process.env.PORT
//middlewares
app.use(express.json())
app.use(cors())
 

readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});


server()

