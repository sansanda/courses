const express = require('express');
const http = require('http');

const hostname = 'localhost';
const portname = 3000;

const app = express();

app.use((req,res,next)=>{
        console.log(req.headers);
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html');
        res.end('<html><body><h1>Hello, Express World!!</h1></body></html>');       
    }
)

const server = http.createServer(app);

server.listen(portname,hostname,()=>
{
    console.log(`Server Running at ${hostname}:${portname}`);    
});
