import axios from 'axios';
import { useState, useEffect } from 'react';

const useRecipeAPI = () => {
    const [recipe, setRecipe] =  useState(null);

    const getRecipes = async () => {
        try{
            const response = await axios.get('http://localhost:8000');
            return response.data;
        } catch (error) {
            console.log(`Error fetching recipes ${error}`);
        }
    }
    return { getRecipes }
}

export default useRecipeAPI;