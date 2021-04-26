import {useState} from 'react';
const AddRecipes = () => {
    const [recpName,setRecpName]=useState("");
    const [ingrQty,setIngrQty]=useState("");
    const [stepsToCook,setStepToCook]=useState("");
    const [ingrName,setIngrName]=useState("");
    const [measurementUnit,setMeasurementUnit]=useState("");
    const [recpImg,setRecpImg]=useState("");
    const [recipeList,setRecipeList]=useState([]);

    const addRecipe=(e)=>{
        e.preventDefault();
        const formData = new FormData() 
        formData.append('recpImg', recpImg);
        formData.append('recpName',recpName);
        formData.append('ingrQty',ingrQty);
        formData.append('stepsToCook',stepsToCook);
        formData.append('ingrName',ingrName);
        formData.append('measurementUnit',measurementUnit);
        fetch('http://localhost:9999/recipe', {
              method: 'POST',
              body:formData,              
            })
            .then(response => response.json())
            .then(result => {
              setRecipeList([...recipeList,result]);
              successMsg();
              clearTextbox();
            })
            .catch(error => {
                //Somthing wrong
            }); 
    }

    const clearTextbox=()=>{
        setRecpName("");
        setIngrQty("");
        setIngrName("");
        setStepToCook("");
        setMeasurementUnit("");
        setRecpImg("");
    }

    const successMsg=()=>{
        alert("Recipes successfully added!");
    }
    const isDisabled=()=>recpName.trim().length===0 || ingrQty.trim().length===0 || stepsToCook.trim().length===0 || ingrName.trim().length===0
    || measurementUnit.trim().length===0;
    return (
        <div className="container shadow-lg p-3 mb-5 mt-5 bg-white rounded">
            <h3 className="head-txt mb-3 text-center">Add Recipes</h3>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="Name" className="form-label"> Recipe Name<span style={{ color: "red" }}>*</span> </label>
                        <input type="text" className="form-control " id="Name" value={recpName} onChange={e=>setRecpName(e.target.value)} placeholder="Recipe Name" />
                    </div>
                </div>
                <div className="col-md-6">
                <div className="form-group">
                        <label htmlFor="IngrName" className="form-label"> Ingredient Name<span style={{ color: "red" }}>*</span> </label>
                        <input type="text" className="form-control " id="IngrName" value={ingrName} onChange={e=>setIngrName(e.target.value)} placeholder="Ingredient Name Ex. abc,def,ghi..." />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                <div className="form-group">
                        <label htmlFor="IngrQuantity" className="form-label"> Ingredient Quantity<span style={{ color: "red" }}>*</span> </label>
                        <input type="text" className="form-control " id="IngrQuantity" value={ingrQty} onChange={e=>setIngrQty(e.target.value)} placeholder="Ingredient Quantity Ex. 12,45,34..." />
                    </div>
                   
                </div>
                <div className="col-md-6">
                <div className="form-group">
                        <label htmlFor="UnitOfIngrQty" className="form-label"> Unit of measurement for ingredient qty.<span style={{ color: "red" }}>*</span> </label>
                        <input type="text" className="form-control " id="UnitOfIngrQty" value={measurementUnit} onChange={e=>setMeasurementUnit(e.target.value)} placeholder="Unit of measurement for ingredient qty." />
                    </div>
                    
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                <div className="form-group">
                        <label htmlFor="PicOfRecipe">Picture of Recipe<span style={{ color: "red" }}>*</span> </label>
                        <input type="file" className="form-control-file " id="PicOfRecipe" onChange={e=>setRecpImg(e.target.files[0])} placeholder="Picture Of Recipe" />
                    </div>
                </div>
                <div className="col-md-6">
                <div className="form-group">
                        <label htmlFor="StepsToCook" className="form-label"> Steps To Cook<span style={{ color: "red" }}>*</span> </label>
                        <input type="text" className="form-control " id="StepsToCook" value={stepsToCook} onChange={e=>setStepToCook(e.target.value)} placeholder="Steps To Cook" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                         <button type="button" className="btn btn-danger mt-1 ml-3" disabled={isDisabled()} onClick={addRecipe}>Add Recipe</button>
                     </div>
                </div>
            </div>
        </div>
    )
}
export default AddRecipes;