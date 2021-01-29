const express = require('express')
const helmet = require('helmet')
const path = require('path');
const mailRouter = require('./routes/mailRouter')

const app = express();

app.use(helmet());

app.use(express.static(`${__dirname}/public`));

app.use(express.json()); 

// app.use(cookieParser());

app.use('/api/mail', mailRouter);

// app.all('*', (req, res, next) => {
//     res.send("Route has not been defined")
//     next()
// });

module.exports = app;