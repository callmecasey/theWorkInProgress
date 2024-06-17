$("#yesAction").click(function (event) {
  event.preventDefault();
  window.location.replace("recipe.html");
  //fetching from API
  // $.ajax({
  //   url: "https://www.themealdb.com/api/json/v1/1/random.php",
  //   method: "GET",
  //   //when the fetch succeed the food is returned
  //   success: function (response) {
  //     console.log(response);
  //     if (response.meals && response.meals.length > 0) {
  //       const meal = response.meals[0];
  //       console.log(meal);
  //       displayRandomRecipe(meal);
  //     } else {
  //       $("#recipeDetails").html("<p>No random meal found.</p>");
  //     }
  //   },
  //   error: function () {
  //     $("#recipeDetails").html("<p>Failed to fetch random meal.</p>");
  //   },
  // });
});

// function displayRandomRecipe(meal) {
//   if (meal) {
//     window.location.replace("recipe.html");
//     console.log(meal);
//     const recipeDetails = `
//     <div class="card-body">
//         <div class="text-center">
//         <h2>${meal.strMeal}</h2>
//         <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid mb-3">
//         <p>${meal.strInstructions}</p>
//         <a href="${meal.strSource}" target="_blank" class="btn btn-primary mt-3">View Full Recipe</a>
//         </div>
//         `;
//     $("#recipeDetails").html(recipeDetails);
//     window.location.replace("recipe.html");
//   } else {
//     window.location.replace("recipe.html");
//     $("#recipeDetails").html("<p>No recipe details available.</p>");
//   }
// }
