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

  // Handle search form submission
  $("#searchForm").submit(function (event) {
    event.preventDefault();
    const searchInput = $("#searchInput").val();
    if (searchInput) {
      saveSearchHistory(searchInput);
      loadSearchHistory();
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
    }
  });
});
