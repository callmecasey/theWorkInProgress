// script.js
$(document).ready(function () {
  // Show age verification modal
  $("#ageVerificationModal").modal("show");

  $("#confirmAge").click(function () {
    $("#ageVerificationModal").modal("hide");
  });

  $("#denyAge").click(function () {
    alert("You must be 18 years or older to enter this site.");
    window.location.href = "https://www.google.com"; // Redirect to another site
  });

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

  // Save search history to local storage
  const saveSearchHistory = (search) => {
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    searchHistory.push(search);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  };

  // Fetch food data from Edamam API
  const fetchFoodData = (query) => {
    const appId = "e2ad7a39";
    const appKey = "af5edc62c46f24f09b8e1c6e1b751ee6";
    const apiUrl = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`;

    $.get(apiUrl, (data) => {
      displayFoodData(data.hits);
    });
  };

  // Display food data in the first row
  const displayFoodData = (foods) => {
    const apiResults = $("#apiResults");
    apiResults.empty();

    foods.forEach((food) => {
      const foodItem = `
        <div class="col-md-12 mb-4">
          <div class="d-flex">
            <img src="${food.recipe.image}" alt="${
        food.recipe.label
      }" class="mr-3" width="150">
            <div>
              <h2><a href="recipe.html?label=${encodeURIComponent(
                food.recipe.label
              )}&image=${encodeURIComponent(
        food.recipe.image
      )}&ingredients=${encodeURIComponent(
        food.recipe.ingredientLines.join(", ")
      )}">${food.recipe.label}</a></h2>
              <p>${food.recipe.ingredientLines.join(", ")}</p>
            </div>
          </div>
        </div>
      `;
      apiResults.append(foodItem);
    });
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
