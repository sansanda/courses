const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: true,
            unique: true     
        },
        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

var dishesModel = mongoose.model('Dish',dishSchema);
module.exports = dishesModel;
