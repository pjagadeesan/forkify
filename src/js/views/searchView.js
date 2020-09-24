import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = "";
};

export const clearResults = () => {
  elements.searchResultList.innerHTML = '';
  elements.resultPages.innerHTML ='';
};

// type : prev or next
const createButton = (page, type) => 
     `
                <button class="btn-inline results__btn--${type}" data-goto = ${type === 'prev' ? page - 1 : page + 1 }>
                    <span>Page ${type === 'prev' ? page - 1 : page + 1 }</span>    
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                    </svg>
                </button>
    `;

    

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults/resPerPage);
    let button;
    if( page == 1 && pages > 1){
        //button to next page
        button = createButton(page, 'next');
    } else if(page < pages){
        // prev and next button
        button = `${createButton(page, 'next')}
                  ${createButton(page, 'prev')}`;
    } else if(page === pages){
        //only prev button for last page
        button = createButton(page, 'prev');
    }
    elements.resultPages.insertAdjacentHTML('afterbegin', button);  
};

export const renderResults = (recipes, page =1, resPerPage = 10) => {
    /**
     * start - 0, 9, 19...
     * end - 10, 20, 30...
     */
    //render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
    //render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
  
}

const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
//reduce method has an inbuilt accumulator and we are using it for incrementing the length
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newTitle.join(" ")} ...`;
  }
  return title;
};

const renderRecipe = (recipe) => {
  const resultList = elements.searchResultList;
  const li = document.createElement("li");

  const resultHtml = `
            <a class="results__link" href=#${recipe.recipe_id}>
                <figure class="results__fig">
                    <img src=${recipe.image_url} alt=${recipe.title}>
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(
                      recipe.title
                    )}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>`;

  li.innerHTML = resultHtml;
  resultList.appendChild(li);
};
