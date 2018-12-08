const mongoose = require('mongoose');
const dishesModel = require('./models/dishesModel');
const dbUrl = 'mongodb://localhost:27017/conFusion';

const dbConnection = mongoose.connect(dbUrl);

dbConnection
.then(
    (db)=>{
        console.log('Connected corretly to the server');
        dishesModel.create({
            name: 'Uthapizza',
            description: 'Test'
        })
        .then((dish) => {
            console.log("Added dish: \n");
            console.log(dish);
            
            return dishesModel.find({}).exec();
        })
        .then((dishes) => {
            console.log("Dishes List: \n");
            console.log(dishes);
    
            return dishesModel.remove({});
        })
        .then(() => {
            console.log("Removed all dishes. \n")
            console.log("Closing Connection... \n")
            return mongoose.connection.close();
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