//putting reusable stuffs together - used across all modules

export const elements = {
    searchInput : document.querySelector('.search__field'),
    searchForm : document.querySelector('.search'),
    searchResultList : document.querySelector('.results__list'),
    searchResult : document.querySelector('.results'),
    resultPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe')
};

//we need to render a loader on results part and recipe part.. 
//We need a parent to know from where it is being called
export const renderLoader = parent => {
    const loader = `
        <div class ="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const removeLoader = () => {
    const loader = document.querySelector('.loader');
    if(loader) loader.parentNode.removeChild(loader);
}