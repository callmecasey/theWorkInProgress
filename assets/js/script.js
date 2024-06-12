// script.js
$(document).ready(function () {
  $("#ageVerificationModal").modal("show");

  $("#confirmAge").click(function () {
    $("#ageVerificationModal").modal("hide");
  });

  $("#denyAge").click(function () {
    alert("You must be 21 years or older to enter this site.");
    window.location.href = "https://www.bing.com/"; // Redirect to another site
  });
});
