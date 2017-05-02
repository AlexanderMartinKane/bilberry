(function(){

  var btns     = document.getElementsByClassName("aboutUs-content-tabInfo-carousel-btn");
  var items    = document.getElementsByClassName("aboutUs-content-tabInfo-carousel-item");
  var undrln   = document.getElementById("carousel-underline");
  var timerId;
  var undrlnLeft;
  var undrlnStep;
  var currentBtn;

  window.addEventListener("resize", checkViewportSize);

  function checkViewportSize() {

    if (window.innerWidth > 1439) {

      // to avoid variables overwriting on every check
      // to run new click if there were screen changes

      if (undrlnLeft !== 97 && undrlnStep !== 391) {
        undrlnLeft = 97;
        undrlnStep = 391;
        btns[currentBtn].click();

        // stop the mobile swiper autoplay from script higher
        // to not to run it in vain

        stopMobileAutoplay();
      }

    } else if (window.innerWidth > 1199) {
      
      if (undrlnLeft !== 122 && undrlnStep !== 363) {
        undrlnLeft = 122;
        undrlnStep = 363;
        btns[currentBtn].click();
        stopMobileAutoplay()
      }

    } else if (window.innerWidth > 991) {

      if (undrlnLeft !== 42 && undrlnStep !== 284) {
        undrlnLeft = 42;
        undrlnStep = 284;
        btns[currentBtn].click();
        stopMobileAutoplay();
      }

    } else if (window.innerWidth > 767) {

      if (undrlnLeft !== 17 && undrlnStep !== 236) {
        undrlnLeft = 17;
        undrlnStep = 236;
        btns[currentBtn].click();
        stopMobileAutoplay();
      }

    } else if (window.innerWidth > 569){

      // stop desctop carousel and low screen swipers

      if (undrlnLeft !== 0 && undrlnStep !== 0) {
        undrlnLeft = 0;
        undrlnStep = 0;
        clearTimeout(timerId);
        stopMobileAutoplay();

        // and start mobile swiper autoplay for middle screens
        // from the script higher

        mySwiper.startAutoplay();
      } else if (undrlnLeft === 0 && undrlnStep === 0) {
        stopMobileAutoplay();
        mySwiper.startAutoplay();
      }

    } else {

      // check if we get here from 570 - 767 screen

      if (undrlnLeft === 0 && undrlnStep === 0) {
        mySwiperCities.startAutoplay();
        mySwiperClients.startAutoplay();
      } else if (undrlnLeft !== 0 && undrlnStep !== 0) {
        undrlnLeft = 0;
        undrlnStep = 0;

        clearTimeout(timerId);
        stopMobileAutoplay();

        mySwiper.startAutoplay();
        mySwiperCities.startAutoplay();
        mySwiperClients.startAutoplay();
      }

    }
  }

  function buildCarousel() {

    // onclick event for each button

    for (var i = 0; i < btns.length; i++) {

      // desctop carousel

      btns[i].onclick = function() {
        var currentIndex;

        for (var i = 0; i < btns.length; i++) {

          // only to display an item with the same index as the current button has
          // to calculate a position of the underline for the current button
          // saves the current button index to click it when viewport sized has been changed
          // (to begin from the same place)

          if (this === btns[i]) {
            currentIndex           = i;
            currentBtn             = i;
            items[i].style.display = "flex";
            undrln.style.left      = undrlnLeft + (i * undrlnStep) + "px";
          } else {
            items[i].style.display = "none";
          }
        }

        // each click reset timer and runs the next button click if it presents

        clearTimeout(timerId);
        timerId = setTimeout(function(){
          btns[currentIndex + 1] ? btns[currentIndex + 1].click() : btns[0].click();
        }, 10000);
      }
    }

    // start desctop carousel without user

    btns[0].click();
  }

  buildCarousel();
  checkViewportSize();

})();