$(document).ready(function () {
  // Add smooth scrolling
  $("#main-nav a").on("click", function (e) {
    // Check for a hash value
    if (this.hash !== "") {
      // Prevent default behavior
      e.preventDefault();

      // Store hash
      var hash = this.hash;

      // add scroll spy
      $("body").scrollspy({ target: "#main-nav" });

      // Animate smooth scroll
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        900,
        function () {
          // Add hash to URL after scroll
          window.location.hash = hash;
        }
      );
    }
  });

  // Function to generate time options for every 30 minutes
  function generateTimeOptions(startTime, endTime) {
    var options = '<option value="">Select a time</option>';
    var currentTime = startTime;

    while (currentTime <= endTime) {
      options +=
        '<option value="' + currentTime + '">' + currentTime + "</option>";
      // Increment time by 30 minutes
      var timeArray = currentTime.split(":");
      var hours = parseInt(timeArray[0]);
      var minutes = parseInt(timeArray[1]);
      minutes += 30;
      if (minutes >= 60) {
        hours += 1;
        minutes -= 60;
      }
      currentTime =
        (hours < 10 ? "0" : "") +
        hours +
        ":" +
        (minutes < 10 ? "0" : "") +
        minutes;
    }

    return options;
  }

  // Function to update the time options based on the selected day
  function updateTimes(day) {
    var defaultOptions = '<option value="">Select a time</option>';
    $("#timeSelect").html(defaultOptions);

    switch (day) {
      case "sabado":
        $("#timeSelect").append(generateTimeOptions("10:30", "16:30"));
        break;
      case "domingo":
        $("#timeSelect").append(generateTimeOptions("11:00", "16:00"));
        break;
      case "miercoles":
        $("#timeSelect").append(generateTimeOptions("10:30", "15:30"));
        break;
      case "viernes":
        $("#timeSelect").append(generateTimeOptions("10:30", "14:00"));
        break;
    }
  }

  // Event handler for the day selection
  $("#daySelect").change(function () {
    var selectedDay = $(this).val();
    updateTimes(selectedDay);
  });
});
