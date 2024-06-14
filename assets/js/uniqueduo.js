$("#yesAction").click(function () {
  const fetchFoodData = (query) => {
    const appId = "e2ad7a39";
    const appKey = "af5edc62c46f24f09b8e1c6e1b751ee6";
    const apiUrl = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`;

    $.get(apiUrl, (data) => {
      displayFoodData(data.hits);
    });
  };
});
