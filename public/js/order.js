"use strict";

(function(){

  var nameInput     = $('#name');
  var phoneInput    = $('#phone');
  var emailInput    = $('#email');
  var form          = $('#order-form');
  var modal         = $('#order-modal');
  var responseModal = $('.response-modal');
  var responseWrap  = $('.response-wrapper');
  var responseOK    = $('#responseOK');
  var responseText  = $('.response-text');
  var callbackName  = $('#callback-name');
  var callbackPhone = $('#callback-phone');
  var callbackOK    = $('#sendData');
  
  form.submit(function(event){

    event.preventDefault();

    var regexName   = /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/;
    var regexPhone  = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    var regexEmail  = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;

    if ( $('.name-fail')[0] ) {
      $('.name-fail')[0].remove();
    }

    if ( $('.phone-fail')[0] ) {
      $('.phone-fail')[0].remove();
    }

    if ( $('.email-fail')[0] ) {
      $('.email-fail')[0].remove();
    }

    if ( isValid() ) sendDataShowResponse();

    function isValid() {
      var valid = true;

      if ( nameInput.val() === "" ) {
        nameInput.after( $('<div>').text('Обязательное поле').attr('class', 'name-fail') );
        valid   = false;
      }

      if ( phoneInput.val() === "" ) {
        phoneInput.after( $('<div>').text('Обязательное поле').attr('class', 'phone-fail') );
        valid   = false;
      }

      if ( !regexName.test( nameInput.val() ) ) {
        nameInput.after( $('<div>').text('Неверный формат имени. Пример: Анастасия').attr('class', 'name-fail') );
        valid   = false;
      }

      if ( !regexPhone.test( phoneInput.val() ) ) {
        phoneInput.after( $('<div>').text('Неверный формат телефона. Пример: +38 000 000-00-00').attr('class', 'phone-fail') );
        valid   = false;
      }

      if ( emailInput.val() !== "" && !regexEmail.test( emailInput.val() ) ) {
        emailInput.after( $('<div>').text('Неверный формат email адреса. Пример: e-mail@mail.com').attr('class', 'email-fail') );
        valid   = false;
      }

      return valid;  
    }

    function sendDataShowResponse() {
      const person = {};

      person.name  = nameInput.val();
      person.phone = phoneInput.val().replace(/-|\s/g, "").slice(-10);
      person.email = emailInput.val();

      var request  = $.post( "http://localhost:3000", JSON.stringify(person), "json");
      
      request.done(function(data){
        var response = data.answer;

        responseText.html(response);
        
        modal.hide();
        responseModal.show();
      })

      request.fail(function(){
        responseText.text('Извините, но на данный момент сервер не отвечает.');
        modal.hide();
        responseModal.show();
      })

    }

  });

  callbackOK.click(function(){

    if ( callbackName.val() !== "" && callbackPhone.val() !== "" ) {
      const person = {};

      person.name  = callbackName.val();
      person.phone = callbackPhone.val();
      person.email = "";

      var request  = $.post( "http://localhost:3000", JSON.stringify(person), "json");
      
      request.done(function(data){
        var response = data.answer;

        responseText.html(response);
        
        modal.hide();
        responseModal.show();
      })

      request.fail(function(){
        responseText.text('Извините, но на данный момент сервер не отвечает.');
        modal.hide();
        responseModal.show();
      })
    } 

    if (callbackName.val() === "") {
      callbackName.css('border', '1px solid red');
    } else {
      callbackName.css('border', '1px solid transparent');
    }

    if (callbackPhone.val() === "") {
      callbackPhone.css('border', '1px solid red')
    } else {
      callbackPhone.css('border', '1px solid transparent');
    }
    
  })

  responseModal.on("click", function(event) {
    $(this).hide();
  });

  responseWrap.on("click", function(event) {
    event.stopPropagation();
  });

  responseOK.on("click", function(event) {
    responseModal.hide();
  });

  $(window).keydown(function(event){
    if (event.key === "Enter") responseModal.hide();
  })

})();