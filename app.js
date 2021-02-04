const express = require('express')
const helmet = require('helmet')
const path = require('path');
const mailRouter = require('./routes/mailRouter')

const app = express();

app.use(helmet());

app.use(express.static(`${__dirname}/public`));

app.use(express.json()); 
// ngrok
app.post('/abc', (req,res,next) => {
    console.log(req)
    res.end('Hello world')
    next()
})

app.get('/', (req, res, next) => {
    res.end('Your system issue got resolved??')
})

app.use('/api/mail', mailRouter);

module.exports = app;