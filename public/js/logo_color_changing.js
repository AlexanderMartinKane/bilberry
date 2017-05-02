(function(){

  var logo = document.getElementById("home");

  // to not to run func in vain when viewport size is less than 1199px
  // instead just to use simple hover on a static link
  // in mobile mode clean mouse events for logo for it's hidden

  if (window.innerWidth > 1199) {
    activateColorChanging();
  } else if (window.innerWidth < 768) {
    logo.onmouseenter = null;
    logo.onmouseleave = null;
  } else {
    logo.onmouseenter = function() { this.style.color = "#ffbb42"; }
    logo.onmouseleave = function() { this.style.color = "#e9e9e9"; }
  }

  function activateColorChanging() {

    changeLogoColor();
    
    logo.onmouseenter = function() {

      // orange hover on the first, third and fifth pages
      // white hover on the second and fourth pages

      if ( window.scrollY < 645 || (window.scrollY >= 1405 && window.scrollY < 2145) || window.scrollY >= 2820 ) {
        this.style.color = "#ffbb42";
      } else {
        this.style.color = "#ffffff";
      }

    }

    logo.onmouseleave = changeLogoColor;
    
    document.onscroll = changeLogoColor;

  }

  // grey on the first and black on the others

  function changeLogoColor() {

    if (window.scrollY < 645) {
      logo.style.color = "#e9e9e9";
    } else {
      logo.style.color = "#000000";
    }

  }

  // when viewport size is less than 1199px, to erase document.onscroll

  window.addEventListener("resize", checkSize);

  function checkSize() {

    if (window.innerWidth > 1199) {
      activateColorChanging();
    } else {
      logo.style.color = "#e9e9e9";
      document.onscroll = null;
    }

  }

})();