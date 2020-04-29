const express = require('express');
const path = require('path');

const app = express();
const cors = require('cors');
const db = require('./database').getInstance();

db.setModels();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({ origin: "*" }));
global.appRoot = __dirname;

const indexRouter = require('./routes/index');

app.use('/', indexRouter);

app.listen(3000, () => {
    console.log('3000');
});
