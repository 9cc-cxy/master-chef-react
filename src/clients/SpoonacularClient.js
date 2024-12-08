import axios from "axios";

export const KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
export const SPOONACULAR_API = "https://api.spoonacular.com";

// search by keyword
export const searchRecipes = async (query) => {
  const response = await axios.get(
   `${SPOONACULAR_API}/recipes/complexSearch?apiKey=${KEY}&query=${query}`);
  return response.data;
};

// get particular recipe details
export const getRecipeById = async (id) => {
  const response = await axios.get(
    `${SPOONACULAR_API}/recipes/${id}/information?apiKey=${KEY}`);
   return response.data;
}
 