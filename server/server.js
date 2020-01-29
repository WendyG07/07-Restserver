const express = require('express');

const app = express();
const bodyParser = require('body-parser');
require('./config/config')


//mongoose
const mongoose = require('mongoose');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(require('./routes/usuario'));
//////////////////////////////////
//agregando algo nuevo
//mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
mongoose.connect(process.env.URLDB = urlDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos online');
});

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto", process.env.PORT);
})