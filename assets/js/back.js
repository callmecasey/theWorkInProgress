$(document).ready(function () {
  // Fetch and display recipe details from query parameters
  displayRecipeDetails();

  // Fetch random cocktail

  fetchRandomCocktail();

  // Handle Back button click
  $("#back-Btn").on("click", function () {
    window.location.replace("index.html");
  });

  function fetchRandomCocktail() {
    $.ajax({
      url: "https://www.thecocktaildb.com/api/json/v1/1/random.php",
      method: "GET",
      success: function (response) {
        if (response.drinks && response.drinks.length > 0) {
          const cocktail = response.drinks[0];
          console.log(cocktail);
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
    const recipeUrl = urlParams.get("recipeUrl");
    console.log(label);

    if (label && image && ingredients && recipeUrl) {
      const recipeDetails = `
          <div class="card-body">
            <div class="text-center">
              <h2>${label}</h2>
              <img src="${image}" alt="${label}" class="img-fluid mb-3">
              <p>${ingredients}</p>
              <a href="${recipeUrl}" target="_blank" class="btn btn-success mt-3">View Full Recipe</a>
            </div>
          </div>
        `;
      $("#recipeDetails").html(recipeDetails);
    } else if (label === null) {
      //fetching from API
      $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/random.php",
        method: "GET",
        //when the fetch succeed the food is returned
        success: function (response) {
          console.log(response);
          if (response.meals && response.meals.length > 0) {
            const meal = response.meals[0];
            console.log(meal);
            displayRandomRecipe(meal);
          } else {
            $("#recipeDetails").html("<p>No random meal found.</p>");
          }
        },
        error: function () {
          $("#recipeDetails").html("<p>Failed to fetch random meal.</p>");
        },
      });
    } else {
      $("#recipeDetails").html("<p>No recipe details available.</p>");
    }
  }
});

function displayRandomRecipe(meal) {
  const recipeDetails = `
    <div class="card-body">
        <div class="text-center">
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid mb-3">
        <p>${meal.strInstructions}</p>
        <a href="${meal.strSource}" target="_blank" class="btn btn-primary mt-3">View Full Recipe</a>
        </div>
        `;
  $("#recipeDetails").html(recipeDetails);
}
