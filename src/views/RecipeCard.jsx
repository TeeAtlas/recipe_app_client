import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RecipeCard.css";

//pass getRecipes funtion as a prop
export default function RecipeCard() {
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getRecipe();
  }, [id]);

  async function getRecipe() {
    try {
      const response = await fetch(`http://localhost:8000/recipes/${id}`);
      const recipesData = await response.json();
      setRecipe(recipesData);
      console.log(recipesData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <div className="recipe-card">
            <div className="recipe-content">
              <img
                className="recipe-image"
                src={recipe.image_path}
                alt="pasta"
              />
              <div className="ingr-instr">
                <h2 className="card-header">{recipe.title}</h2>
                <ul className="ingredients">
                  {recipe.ingredients_id.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <p className="instructions">{recipe.instructions}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
