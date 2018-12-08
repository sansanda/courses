const mongoose = require('mongoose');
const dishesModel = require('./models/dishesModel');
const dbUrl = 'mongodb://localhost:27017/conFusion';

const dbConnection = mongoose.connect(dbUrl);

dbConnection
.then(
    (db)=>{
        console.log('Connected corretly to the server');
        var newDish = dishesModel({name: 'Uthappizza',description: 'Test'});
        newDish.save()
        .then(
            (dish)=>{
                console.log("Added dish: \n");
                console.log(dish);
                return dishesModel.find({});
            }    
        )
        .then(
            (dishes)=>{
                console.log("Dishes List: \n");
                console.log(dishes);
                return dishesModel.remove({});
            }    
        )
        .then(
            ()=>{
                console.log("Removing all dishes... \n")
                return;
            }    
        )
        .then(
            ()=>{
                console.log("Closing Connection... \n")
                return mongoose.connection.close();
            }    
        )
    }    
)
.catch(
    (err)=> {
        console.log(err);
    }

);