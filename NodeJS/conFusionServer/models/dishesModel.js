const mongoose = require('mongoose');
const mongoose_currency = require('mongoose-currency');
mongoose_currency.loadType(mongoose);
const Currency = mongoose.Types.Currency;


const commentSchema = new mongoose.Schema(
    {
        rating : {
            type: Number,
            min: 1,
            max: 5,
            required: true     
        },
        comment: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);


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
        },
        image: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        label: {
            type: String,
            default: ''
        },
        price: {
            type: Currency,
            required: true,
            min: 0
        },
        featured: {
            type: boolean,
            default: false
        },
        comments: [commentSchema]
    },
    {
        timestamps: true
    }
);

var dishesModel = mongoose.model('Dish',dishSchema);
module.exports = dishesModel;