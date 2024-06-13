// back.js

$(document).ready(function () {
  // Fetch random cocktail
  fetchRandomCocktail();

  // Display recipe details if query parameters are present
  displayRecipeDetails();

  function fetchRandomCocktail() {
    $.ajax({
      url: "https://www.thecocktaildb.com/api/json/v1/1/random.php",
      method: "GET",
      success: function (response) {
        if (response.drinks && response.drinks.length > 0) {
          const cocktail = response.drinks[0];
          displayRandomCocktail(cocktail);
        } else {
          $("#randomCocktail").html("<p>No random cocktail found.</p>");
        }
      },
      error: function () {
        $("#randomCocktail").html("<p>Failed to fetch random cocktail.</p>");
      },
    });
  }

  function displayRandomCocktail(cocktail) {
    const cocktailDetails = `
        <div class="card-body">
          <h5 class="card-title">${cocktail.strDrink}</h5>
          <img src="${cocktail.strDrinkThumb}" class="card-img-top" alt="${cocktail.strDrink}">
          <p class="card-text">${cocktail.strInstructions}</p>
        </div>
      `;
    $("#randomCocktail").html(cocktailDetails);
  }

  function displayRecipeDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const label = urlParams.get("label");
    const image = urlParams.get("image");
    const ingredients = urlParams.get("ingredients");

    if (label && image && ingredients) {
      const recipeDetails = `
          <div class="text-center">
            <h2>${label}</h2>
            <img src="${image}" alt="${label}" class="img-fluid mb-3">
            <p>${ingredients}</p>
          </div>
        `;
      $("#recipeDetails").html(recipeDetails);
    } else {
      $("#recipeDetails").html("<p>No recipe details available.</p>");
    }
  }
});
