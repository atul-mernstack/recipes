import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import Home from "./components/recipes_list";
import AddRecipes from './components/recipes_add';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

const App=()=> {
  const [ingredient,setIngredient]=useState("");
  const [searchResult,setSearchResult]=useState([]);
  const searchRecipe=(e)=>{
    e.preventDefault();
    fetch('http://localhost:9999/recipe', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(results => {
        if(ingredient.length===0){
          setSearchResult([]);
        }else{
          let result=results.filter(value=>value.ingrName.find(str=>str===ingredient));
          setSearchResult(result);          
        }
          setIngredient("");
      })
      .catch(error => {
        //Something wrong
      });
  }

  return (
    <BrowserRouter>
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link className="navbar-brand" to="/">75way Interview Task</Link>
      <ul className="navbar-nav mr-auto ml-2">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="add-recipes">Add Recipes</Link>
        </li>
      </ul>
      <form className="form-inline">
      <input className="form-control ml-sm-2 mr-sm-2 bg-light" type="text" onChange={e=>setIngredient(e.target.value)} value={ingredient} placeholder="Search" aria-label="Search"/>
    <button className="btn btn-outline-light my-2 my-sm-0" type="button" onClick={searchRecipe} data-toggle="modal" data-target="#exampleModal">Search</button>
      </form>
    </div>
  </div>
</nav>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-xl">
    <div className="modal-content modal-xl">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Filtered Recipes</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <table className="table table-striped">
      <thead>
          <tr>
            <th scope="col">Recipes Image</th>
            <th scope="col">Recipes Name</th>
            <th scope="col">Ingredient Name</th>
            <th scope="col">Ingredient Qty</th>
            <th scope="col">Unit of Measurement</th>
            <th scope="col">Steps to Cook</th>
          </tr>
        </thead>
        <tbody>
        {searchResult.map((value,index)=>{
          return (<tr key={index}>
            <td><img style={{ width: "100px", height: "100px" }} src={"/recipe/" + value.imgUrl} alt="" /></td>
            <td>{value.recpName}</td>
            <td>{value.ingrName.toString()}</td>
            <td>{value.ingrQty.toString()}</td>
            <td>{value.measurementUnit}</td>
            <td>{value.stepsToCook}</td>
          </tr>)
        })}
        </tbody>
        </table>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<Switch>   
  <Route exact path="/"><Home searchResult={searchResult}/></Route>
  <Route exact path="/add-recipes" component={AddRecipes}/>
</Switch>
</BrowserRouter>
  );
}

export default App;
