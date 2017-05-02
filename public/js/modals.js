(function(){

  // hide order modal window

  var orderModal = $('#order-modal');
  var orderForm  = $('#order-form');

  orderModal.on("click", function(event) {
    $(this).hide();
  })

  // stop click event on current level in html tree

  orderForm.on("click", function(event) {
    event.stopPropagation();
  })

  // show/hide read more modal window

  var buttons       = document.getElementsByClassName("readMore-modal-dialog-desctop");
  var buttonsMobile = document.getElementsByClassName("readMore-modal-dialog-mobile");

  var moreMobile    = document.getElementById("moreMobile");
  var closeMobile   = document.getElementById("closeMobile");

  var more          = document.getElementById("more");
  var close         = document.getElementById("close");

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick       = showMore;
    buttonsMobile[i].onclick = showMobileMore;
  }

  for (var i = 0; i < buttonsMobile.length; i++) {
    buttonsMobile[i].onclick = showMobileMore;
  }

  close.onclick              = hideMore;
  closeMobile.onclick        = hideMobileMore;

  function showMore() {
    more.style.display       = "block";
  }

  function showMobileMore() {
    moreMobile.style.display = "flex";
  }

  function hideMore() {
    more.style.display       = "none";
  }

  function hideMobileMore() {
    moreMobile.style.display = "none";
  }

})();