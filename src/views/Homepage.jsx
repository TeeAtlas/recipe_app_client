import { useState, useEffect } from 'react';
// import useContentful from './useContentful';
import './Homepage.css';
import {useNavigate} from 'react-router-dom';

const Homepage = () => {
    const [recipes, setRecipes] = useState([]);
    // const { getRecipes } = useContentful();
    const [loading, setLoading] = useState(false);

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

                        <div key={recipe.sys.id} className="homepage-recipe-card" onClick={() => navigate(`${recipe.id}`)}>
                            <h3>{recipe.name}</h3>
                            <img src={recipe.fields.image.fields.file.url} alt="pasta" />
                            {/* <p>{recipe.fields.description}</p> */}
                        </div>
                     )) : null}
                </div>
            </section>}
        </div>
    );
};

export default Homepage;
