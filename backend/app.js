const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

const dotenv = require('dotenv');
const errorMiddleware = require('./middlewares/errors')

dotenv.config({ path: 'backend/config/config.env' })


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());



//Import all routes
const post = require('./routes/post');
const auth = require('./routes/auth');


app.use('/api/v1', post)
app.use('/api/v1', auth)


//Middleware handle the error
app.use(errorMiddleware)



module.exports = app