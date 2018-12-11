const express = require('express');
const bodyParser = require('body-parser');
const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

const mongoose = require('mongoose');
const dishesModel = require('../models/dishesModel');



dishRouter.route('/')
.get((req,res,next)=>{
    dishesModel.find({})
    .then((dishes)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html');
        res.json(dishes);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post((req,res,next)=>{
    dishesModel.create(req.body)
    .then((dish)=>{
        console.log("Created dish", dish);
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html');
        res.json(dish);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT Operation not supported on /dishes');
})
.delete((req,res,next)=>{
    dishesModel.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});


dishRouter.route('/:dishId')
.get((req,res,next)=>{
    dishesModel.findById(req.params.dishId)
    .then((dish)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html');
        res.json(dish);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST Operation not supported on: ' + req.params.dishId);
})
.put((req,res,next)=>{
    dishesModel.findByIdAndUpdate(req.params.dishId,{$set:req.body},{new: true})
    .then((dish)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html');
        res.json(dish);
    },(err)=>next(err))
    .catch((err)=>next(err));    
})
.delete((req,res,next)=>{
    dishesModel.findByIdAndRemove(req.params.dishId)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

dishRouter.route('/:dishId/comments')
.all((req,res,next)=>{
    console.log("looking for comments");
    dishesModel.findById(req.params.dishId)
    .then((dish)=>{
        if (dish==null){
            err = new Error("Dish: " + req.params.dishId + " not found!!!");
            err.status = 404;
            return next(err);
        }else {next();}
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.get((req,res,next)=>{
    dishesModel.findById(req.params.dishId)
    .then((dish)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dish.comments);
        //next(new Error("Test error"));
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post((req,res,next)=>{
    console.log("post on /:dishId/comments/");
})
.put((req,res,next)=>{
    console.log("put on /:dishId/comments/");  
})
.delete((req,res,next)=>{
    console.log("delete on /:dishId/comments/");
});

module.exports = dishRouter;