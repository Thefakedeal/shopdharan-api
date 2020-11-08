const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path')
const formData = require('express-form-data')
require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();
 
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(formData.parse())

app.get('/images/:id',(req,res)=>{
   const id = req.params.id;
   res.sendFile(path.join(__dirname,'../',`images/${id}.jpeg`))
})

app.use('/api',express.json({limit: '10mb'}));
app.use('/api',express.urlencoded({extended:false}));

app.use('/api', api);

app.use(express.static(path.join(__dirname,'public', 'build')));

app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'public', 'build', 'index.html'));
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
