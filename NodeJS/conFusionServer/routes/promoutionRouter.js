const express = require('express');
const bodyParser = require('body-parser');
const promoutionRouter = express.Router();
promoutionRouter.use(bodyParser.json());

promoutionRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next();
})
.get((req,res,next)=>{
    res.end('We will send the promoutiones to you');
})
.post((req,res,next)=>{
    res.end('We will add the promoutiones: ' + req.body.name + ' with details ' + req.body.description);
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT Operation not supported on /promoutiones');
})
.delete((req,res,next)=>{
    res.end('Deliting all the promoutiones!');
});


promoutionRouter.route('/:promoutionId')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next();

})
.get((req,res,next)=>{
    res.end('We will send details of the promoution: '+req.params.promoutionId + ' to you');
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST Operation not supported on: ' + req.params.promoutionId);
})
.put((req,res,next)=>{
    res.write('Updating the promoution: ' + req.params.promoutionId + '\n');
    res.end('We will update the promoution: ' + req.body.name + ' with details ' + req.body.description);
})
.delete((req,res,next)=>{
    res.end('Deliting promoution: ' + req.params.promoutionId);
});


module.exports = promoutionRouter;