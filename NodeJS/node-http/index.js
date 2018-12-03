const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req,resp) => {
    
    //console.log(req.headers);
    console.log("Request for "+req.url+"by method"+req.method);


    //resp.statusCode = 200;
    //resp.setHeader('Content-Type','text/html');
    //resp.end('<html><body><h1>Hello, World!!</h1></body></html>');

    if (req.method=='GET')
    {
        var fileURL;
        if (req.url=='/') fileURL = '/index.html';
        else fileURL = req.url;
        var filePath = path.resolve('./public'+fileURL);
        const fileExt = path.extname(filePath);
        if (fileExt=='.html')
        {
            fs.exists(filePath, (exists)=>{
                if (!exists) {
                    resp.statusCode = 404;
                    resp.setHeader('Content-Type','text/html');
                    resp.end('<html><body><h1>Error 404: '+fileURL+' not found!!</h1></body></html>');
                    return;
                }else
                {
                    resp.statusCode = 200;
                    resp.setHeader('Content-Type','text/html');
                    fs.createReadStream(filePath).pipe(resp);
                }
            })
        }
        else
        {
            resp.statusCode = 404;
            resp.setHeader('Content-Type','text/html');
            resp.end('<html><body><h1>Error 404: '+fileURL+' not found an HTML File!!</h1></body></html>');
            return;
        }
    }
    else
    {
        resp.statusCode = 404;
        resp.setHeader('Content-Type','text/html');
        resp.end('<html><body><h1>Error 404: '+req.method+' not Supported!!</h1></body></html>');
        return;

    }
});

server.listen(port,hostname,()=>{
    console.log(`Server Running at http://${hostname}:${port}`);
});
