const mongoURI = "mongodb://localhost:27017" + "/recipeDB"
let mongoose = require('mongoose');
const { recipe } = require('./schema')

const recipeDB=mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
recipeDB.then(() => { console.log("connection established with mongodb server online"); })
recipeDB.catch(err => {
        console.log("error while connection", err)
    });




const recipeModel = recipeDB.model('recipe', recipe);
exports.recipeModel=recipeModel;