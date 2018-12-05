const express = require('express');
const bodyParser = require('body-parser');
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next();
})
.get((req,res,next)=>{
    res.end('We will send the leaderes to you');
})
.post((req,res,next)=>{
    res.end('We will add the leaderes: ' + req.body.name + ' with details ' + req.body.description);
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT Operation not supported on /leaderes');
})
.delete((req,res,next)=>{
    res.end('Deliting all the leaderes!');
});


leaderRouter.route('/:leaderId')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next();

})
.get((req,res,next)=>{
    res.end('We will send details of the leader: '+req.params.leaderId + ' to you');
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST Operation not supported on: ' + req.params.leaderId);
})
.put((req,res,next)=>{
    res.write('Updating the leader: ' + req.params.leaderId + '\n');
    res.end('We will update the leader: ' + req.body.name + ' with details ' + req.body.description);
})
.delete((req,res,next)=>{
    res.end('Deliting leader: ' + req.params.leaderId);
});


module.exports = leaderRouter;