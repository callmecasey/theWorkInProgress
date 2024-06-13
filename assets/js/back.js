// recipe.js
$(document).ready(function () {
  // Load search history from local storage
  const loadSearchHistory = () => {
    const searchHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    const searchHistoryList = $("#searchHistory");
    searchHistoryList.empty();
    searchHistory.forEach((search, index) => {
      searchHistoryList.append(
        `<li class="list-group-item"><a href="#" class="search-link" data-index="${index}">${search}</a></li>`
      );
    });
  };

  // Display recipe details
  const displayRecipeDetails = () => {
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
  };

  // Handle search form submission
  $("#searchForm").submit(function (event) {
    event.preventDefault();
    const searchInput = $("#searchInput").val();
    if (searchInput) {
      saveSearchHistory(searchInput);
      loadSearchHistory();
      fetchFoodData(searchInput);
      $("#searchInput").val("");
    }
  });

  // Load search history on page load
  loadSearchHistory();

  // Display recipe details on page load
  displayRecipeDetails();

  // Handle click on search history links
  $(document).on("click", ".search-link", function (event) {
    event.preventDefault();
    const searchIndex = $(this).data("index");
    const searchHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (searchHistory[searchIndex]) {
      $("#searchInput").val(searchHistory[searchIndex]);
      fetchFoodData(searchHistory[searchIndex]);
    }
  });
});
