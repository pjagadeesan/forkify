//search.js
//https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
//recipe.js
//https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
import Search from "./models/Search";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import Recipe from "./models/Recipe";
import { elements, renderLoader, removeLoader } from "./views/base";

/** Global state of the application
 * -Search object
 * - current recipe object
 * - shopping list object
 * -Favorite recipes
 */
const state = {};

/**
 * Search controller
 */
const controlSearch = async () => {
  //Get input query
  const query = searchView.getInput();
  if (query) {
    //create search object for the state
    state.search = new Search(query);

    //prepare UI for results
    searchView.clearInput();

    //clear search results
    searchView.clearResults();
    renderLoader(elements.searchResult);
    try {
      //Get results of the search
      await state.search.getResults();
      //remove loader before rendering results
      removeLoader();
      //Render results in the UI
      searchView.renderResults(state.search.result);
    } catch (error) {
      alert("Something went wrong in search..");
      removeLoader();
    }
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.resultPages.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const pageNum = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, pageNum);
  }
});

const recipeLink = document.querySelector(".results__list");

recipeLink.addEventListener("click", (e) => {
  let recipeId;
  const recipeLink = e.target.closest(".results__link");
  if (recipeLink) recipeId = recipeLink.href;

  const r = new Recipe(35477);
  r.getRecipe();
});

/**
 * Recipe controller
 */
const controlRecipe = async () => {
  //get the hash id from the url
  const id = window.location.hash.replace("#", "");
  if (id) {
    //Prepare UI for changes
    renderLoader(elements.recipe);
    recipeView.clearRecipe();

    //Create new recipe object
    state.recipe = new Recipe(id);
   // try {
      //get recipe data
      await state.recipe.getRecipe();
      //calculate Servings , calculate Time, parse ingredients 
      state.recipe.calcTime();
      state.recipe.calcServings();
      state.recipe.parseIngredients();

      //Render in the UI
      removeLoader();
      recipeView.renderRecipe(state.recipe);
      
    //} catch (error) {
     // alert(`Something went wrong rendering recipe..: ${error}`);
    //}
  }
};

//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);

//assigning same eventlistener to multiple events
["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);
