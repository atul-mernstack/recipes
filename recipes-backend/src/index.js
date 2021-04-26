const express=require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const app=express();
app.use(express.json()); //added body key to req
app.use(fileUpload());
const cors=require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
const {recipeModel}=require('./connector');

const isNullOrUndefined=(value)=>value===null || value===undefined;

app.post("/recipe", async (req,res)=>{
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }    
      const file = req.files.recpImg;
      const recpName=req.body.recpName;
      const ingrQty=req.body.ingrQty.split(',');
      const stepsToCook=req.body.stepsToCook;
      const ingrName=req.body.ingrName.split(',');
      const measurementUnit=req.body.measurementUnit;
      const imgName=Date.now();
      const imageUrl=`${imgName}_${file.name}`;
        file.mv(`../recipes-frontend/public/recipe/${imgName}_${file.name}`, async err => {
        if (err) {
          return res.status(500).send(err);
        }
        const addRecipe=new recipeModel({imgUrl:imageUrl,recpName:recpName,ingrQty:ingrQty,ingrName:ingrName,stepsToCook:stepsToCook,measurementUnit:measurementUnit});
        await addRecipe.save();
        res.status(201).send(addRecipe);
      });
 })

 app.get("/recipe",async (req,res)=>{
    const getRecipes=await recipeModel.find();
    if(isNullOrUndefined(getRecipes)){
        res.sendStatus(404);
    }else{
    res.status(201).send(getRecipes);
    }
});

 
app.listen(9999, () => console.log(`App listening on port 9999!`))
module.exports = app;
