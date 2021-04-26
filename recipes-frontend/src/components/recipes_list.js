import { useEffect, useState } from 'react';

const RecipesList = () => {
  const [recipeList, setRecipeList] = useState([]);
  useEffect(() => {
    fetch('http://localhost:9999/recipe', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(result => {
          setRecipeList(result);
      })
      .catch(error => {
        //Somthing wrong
      });

  }, []);

  return (
    < div className="container shadow-lg p-3 mb-5 mt-5 bg-white rounded">
      <h3 className="head-txt mb-3 text-center">Recipes Lists</h3>
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
          {recipeList.map((value, index) => {
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
  )
}
export default RecipesList;