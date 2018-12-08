const mongoose = require('mongoose');
const dishesModel = require('./models/dishesModel');
const dbUrl = 'mongodb://localhost:27017/conFusion';

const dbConnection = mongoose.connect(dbUrl);

dbConnection
.then(
    (db)=>{
        console.log('Connected corretly to the server');
        console.log("Creating and adding a dish to the DB...");
        dishesModel.create({
            name: 'Uthapizza',
            description: 'Test'
        })
        .then((dish) => {
            console.log("Added dish to the DB. \n");
            console.log(dish);
            console.log("Updating the dish.... \n");
            return dishesModel.findByIdAndUpdate(dish._id,{$set:{description:"Updated Test"}},{new: true}).exec();
        })
        .then((dish) => {
            console.log("Updated Dish on the DB. \n");
            console.log(dish);
            console.log("Updating the dish (comments).... \n");
            dish.comments.push({rating: 5,comment: "I\'m getting a sinking feling!",author: "David"});
            return dish.save();
        })
        .then((dish) => {
            console.log("Again..Updated Dish (Comment added) on the DB. \n")
            console.log(dish);
            console.log("Removing all dishes..... \n")
            return dishesModel.remove({}); 
        })
        .then(()=>{
            console.log("All dishes removed on the DB. \n")
            return dishesModel.find({});
        })
        .then((dishes)=>
        {
            console.log("Dishes List:")
            console.log(dishes);
            console.log("Closing Connection... \n")
            return mongoose.connection.close();
        })
        .then(()=>{
            console.log('Connection closed.');
        })
        .catch((err) => {
            console.log(err);
        });
    }    
)
.catch(
    (err)=> {
        console.log(err);
    }

);