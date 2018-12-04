const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyparser = require('body-parser');



const hostname = 'localhost';
const portname = 3000;

const app = express();

app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(express.static(__dirname+'/public'));

app.all('/dishes',(req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next();

});

app.get('/dishes',(req,res,next)=>{
    res.end('We will send the dishes to you');
});

app.post('/dishes',(req,res,next)=>{
    res.end('We will add the dish: ' + req.body.name + ' with details ' + req.body.description);
});

app.put('/dishes',(req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT Operation not supported on /dishes');
});

app.delete('/dishes',(req,res,next)=>{
    res.end('Deliting all the dishes!');
});

app.get('/dishes/:dishId',(req,res,next)=>{
    res.end('We will send details of the dish: '+req.params.dishId + ' to you');
});

app.post('/dishes/:dishId',(req,res,next)=>{
    res.statusCode = 403;
    res.end('POST Operation not supported on: ' + req.params.dishId);
});

app.put('/dishes/:dishId',(req,res,next)=>{
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('We will update the dish: ' + req.body.name + ' with details ' + req.body.description);
});

app.delete('/dishes/:dishId',(req,res,next)=>{
    res.end('Deliting dish: ' + req.params.dishId);
});
app.use((req,res,next)=>{

        //console.log(req.headers);
        
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html');
        res.end('<html><body><h1>Hello, Express World!!</h1></body></html>');       
    }
);

const server = http.createServer(app);

server.listen(portname,hostname,()=>
{
    console.log(`Server Running at ${hostname}:${portname}`);    
});
