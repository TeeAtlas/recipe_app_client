import Dropdown from "./Dropdown";
import logo from '../assets/farfalle.png'
import searchIcon from '../assets/search.png'
import './Navbar.css'
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";



const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecipes();
  }, []);

  async function getRecipes() {
    try {
      const response = await fetch("http://localhost:8000/recipes");
      const recipesData = await response.json();
      setRecipes(recipesData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const allIngredients = recipes.flatMap((recipe) => {
    // Check if 'fields' is defined for the current recipe
    if (recipe && recipe.ingredients) {
      const ingredientsArray = recipe.ingredients.split(',').map((ingredient) => ingredient.trim());
      
      const recipeId = recipe.id; // Get the recipe ID
      return ingredientsArray.map((ingredient) => ({
        id: recipeId,
        ingredient,
      }));
    }
    return [];
  });


  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === 'pasta' || e.target.value === 'Pasta') {
      alert('Not Pasta obviously, something else')
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const matchingIngredients = allIngredients.filter(
      (ingredient) => ingredient.ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    allIngredients.forEach(ingredient => console.log(ingredient));
    
  
    if (matchingIngredients.length === 0) {
      alert('No results found');
    } else {
      setResults(matchingIngredients);
      const firstIngredient = matchingIngredients[0];
      navigate(`${firstIngredient.id}`);
    }

    setSearchTerm(''); // clear the search field

  };
  
  


  return (
    <div className="navbar-container">
      <nav className="Navbar">
        <ul>
          <NavLink to="/"><img className="logo" src={logo} alt='logo'/></NavLink>
          <NavLink to="/" >Homepage</NavLink>
          <li>
            <Dropdown recipes={recipes}/>
          </li>
          <NavLink to="/gallery">Gallery</NavLink>
        </ul>
        <div>
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input type="text" value={searchTerm} placeholder="Search Ingredients..." onChange={handleChange} className='searchbar'/>
          <button type="submit" className="search-button">
            <img className="search-icon" src={searchIcon} alt='search icon'/>
          </button>
        </form>
      </div>
    </div>
      </nav>
    </div>
  )
  }

export default NavBar;