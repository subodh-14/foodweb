const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:String,
    price:Number
})

const Dish = mongoose.model("Dish",UserSchema);
module.exports = Dish;
