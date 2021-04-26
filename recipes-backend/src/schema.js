const { Schema } = require('mongoose');

const recipe = new Schema({
    recpName: String,
    ingrName: [String],
    ingrQty: [Number],
    stepsToCook: String,
    measurementUnit: String,
    imgUrl:String
});

exports.recipe=recipe;