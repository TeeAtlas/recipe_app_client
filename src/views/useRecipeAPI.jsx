import axios from 'axios';

const useRecipeAPI = () => {
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