const express = require('express');
const bodyParser = require('body-parser');
const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

const mongoose = require('mongoose');
const dishModel = require('../models/dishModel');



dishRouter.route('/')
.get((req,res,next)=>{
    dishModel.find({}).then((dishes)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html');
        res.json(dishes);
    },)
})
.post((req,res,next)=>{
    res.end('We will add the dishes: ' + req.body.name + ' with details ' + req.body.description);
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT Operation not supported on /dishes');
})
.delete((req,res,next)=>{
    res.end('Deliting all the dishes!');
});


dishRouter.route('/:dishId')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next();

})
.get((req,res,next)=>{
    res.end('We will send details of the dish: '+req.params.dishId + ' to you');
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST Operation not supported on: ' + req.params.dishId);
})
.put((req,res,next)=>{
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('We will update the dish: ' + req.body.name + ' with details ' + req.body.description);
})
.delete((req,res,next)=>{
    res.end('Deliting dish: ' + req.params.dishId);
});


module.exports = dishRouter;