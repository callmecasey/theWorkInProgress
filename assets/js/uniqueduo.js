$("#yesAction").click(function (event) {
  event.preventDefault();
  $.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/random.php",
    method: "GET",
    success: function (response) {
      console.log(response);
      if (response.meals && response.meals.length > 0) {
        const meal = response.meals[0];
        console.log(meal);
      } else {
        $("#recipeDetails").html("<p>No random meal found.</p>");
      }
    },
    error: function () {
      $("#recipeDetails").html("<p>Failed to fetch random meal.</p>");
    },
  });
});

// const fetchFoodData = (query) => {
//   const apiUrl = ``;

//   $.get(apiUrl, (data) => {
//     displayFoodData(data.hits);
//   });
// };

function displayRecipeDetails(meal) {
  const urlParams = new URLSearchParams(window.location.search);
  const label = urlParams.get("label");
  const image = urlParams.get("image");
  const ingredients = urlParams.get("ingredients");

  if (label && image && ingredients) {
    const recipeDetails = `
        <div class="text-center">
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid mb-3">
        <p>${meal.strInstructions}</p>
        </div>
        `;
    $("#recipeDetails").html(recipeDetails);
    window.location.replace("recipe.html");
  } else {
    $("#recipeDetails").html("<p>No recipe details available.</p>");
    window.location.replace("recipe.html");
  }
}
