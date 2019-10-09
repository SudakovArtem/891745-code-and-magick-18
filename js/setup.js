'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var userDialog = document.querySelector('.setup');
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var form = userDialog.querySelector('.setup-wizard-form');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var getSetupElement = function () {
    return setup;
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    userDialog.classList.remove('hidden');
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', openPopup);

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', closePopup);

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  var formSubmitHandler = function (evt) {
    window.backend.upload(new FormData(form), function () {
      userDialog.classList.add('hidden');
    }, window.similar.errorHandler);
    evt.preventDefault();
  };

  form.addEventListener('submit', formSubmitHandler);

  window.setup = {
    getSetupElement: getSetupElement
  };
})();
