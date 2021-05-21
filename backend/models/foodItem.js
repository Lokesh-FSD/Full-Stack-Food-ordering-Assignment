//importing mosngoose
const mongoose = require('mongoose');

//Making Schema and connenting Mongo-DB database
const Schema = mongoose.Schema;

const FoodModel = new Schema(
    {
        "name": String,
        "image": String,
        "price": Number,
        "description": String
    },
    {
        'collection': "FoodCollection",
    }
)

module.exports = mongoose.model("FoodCollection", FoodModel)