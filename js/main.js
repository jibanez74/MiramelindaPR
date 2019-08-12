$(document).ready(function() {
  // Add smooth scrolling
  $('#main-nav a').on('click', function(e) {
    // Check for a hash value
    if (this.hash !== '') {
      // Prevent default behavior
      e.preventDefault();

      // Store hash
      var hash = this.hash;

      // add scroll spy
      $('body').scrollspy({ target: '#main-nav' });

      // Animate smooth scroll
      $('html, body').animate(
        {
          scrollTop: $(hash).offset().top
        },
        900,
        function() {
          // Add hash to URL after scroll
          window.location.hash = hash;
        }
      );
    }
  });
});
