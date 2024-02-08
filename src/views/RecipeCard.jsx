import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RecipeCard.css';


//pass getRecipes funtion as a prop
export default function RecipeCard (getRecipes) {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false);

  const { id } = useParams();


  // const allIngredients = recipes.flatMap((recipe) => {
  //   if (recipe && recipe.ingredients) {
  //     const ingredientsArray = recipe.ingredients.split(',').map((ingredient) => ingredient.trim());
      
  //     const recipeId = recipe.id; // Get the recipe ID
  //     return ingredientsArray.map((ingredient) => ({
  //       id: recipeId,
  //       ingredient,
  //     }));
  //   }
  //   return [];
  // });

  // const specificIngredients = allIngredients
  //   .filter((ingredient) => ingredient.id === id)
  //   .map((ingredient) => ingredient.ingredient);
  
    
    useEffect(() => {

      getRecipes()
  
    }, []);

    async function getRecipes() {
      try { 
          setLoading(true);
          const response = await fetch("http://localhost:8000/recipes");
          const recipes = await response.json();
          setRecipes(recipes);
      } catch (error) {
          console.log(recipes);
          console.log(error);
      } finally {
          setLoading(false);
      }
    }
    


  return (
    <>
    { loading ? <h3>Loading...</h3> :
        <div className="recipe-card"> 
          <div className="recipe-content">
            <img className="recipe-image" src={recipe.image_path} alt="pasta"  />
            <div className='ingr-instr'>
            <h2 className='card-header'>{recipe.title}</h2> 
              <ul className='ingredients'>
                {specificIngredients.map((ingredient, index) =>
                  <li key={index}>{ingredient}</li>
                )}
              </ul>
              <p className='instructions'>{recipe.instructions}</p>
            </div>
          </div>
        </div> 
    </>
  )
    
}