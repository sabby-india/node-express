const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');//body of the incoming request is parsed and included in the body object of the request

const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

const hostname = "localhost";
const port = 3000;

const app = express(); //create an express application

app.use(morgan('dev')); //using morgan handler for development
app.use(bodyParser.json());

//any req coming through the /dishes end point, will be redirected to the dishRouter route
app.use('/dishes', dishRouter);
app.use('/dishes/dishId', dishRouter);

app.use('/promotions',promoRouter);
app.use('/promotions/promoId',promoRouter);

app.use('/leaders',leaderRouter);
app.use('/leaders/:leaderId',leaderRouter);

app.use(express.static(__dirname + '/public'));

app.use((req,res,next) =>{
    console.log(req.header);
    res.statusCode = 200;
    res.setHeader('Content-type','text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});


const server = http.createServer(app);

server.listen(port,hostname,() =>{
    console.log(`Server running at http://${hostname}:${port}/`);
});