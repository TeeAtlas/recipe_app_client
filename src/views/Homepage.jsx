import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      getRecipes();
    }, []);
  
    async function getRecipes() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/recipes");
        const recipesData = await response.json();
        //shuffle
        const shuffledRecipes = (shuffleArray(recipesData));
        setRecipes(shuffledRecipes);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    // Function to shuffle an array randomly
    const shuffleArray = (array) => {
        let currentIndex = array.length, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // Swap the elements
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    };

    const navigate = useNavigate();

  

    return (
        <div className="homepage">
            <header>
                <h1>What's Cookin'</h1>
            </header>

            {loading ? <h3>Loading...</h3> :<section className="featured-recipes">
                <div className='homepage-container'>
                    
                    {recipes.length > 0 ? recipes.map((recipe) => (

                        <div key={recipe.id} className="homepage-recipe-card" onClick={() => navigate(`${recipe.id}`)}>
                            <h3>{recipe.title}</h3>
                            <img src={recipe.image_path} alt="pasta" />
                        </div>
                     )) : null}
                </div>
            </section>}
        </div>
    );
};

export default Homepage;
