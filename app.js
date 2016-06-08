var morgan = require('morgan');
var express = require('express');
var bodyParser = require('body-parser'); // post 요청을 위한 body-parser
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(require('./appRouter'));
app.use(handleError);

app.listen(3000);

function handleError(err, req, res, next) {
   res.status(err.code).send({msg:err.message});
}