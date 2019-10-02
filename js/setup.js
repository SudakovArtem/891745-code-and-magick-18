'use strict';

(function () {
  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIRE_BAL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var ERROR_NODE_STYLE = {
    style: 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;',
    position: 'absolute',
    left: 0,
    right: 0,
    fontSize: '30px',
  };
  var userDialog = document.querySelector('.setup');
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var wizardCoat = setup.querySelector('.wizard-coat');
  var wizardEyes = setup.querySelector('.wizard-eyes');
  var wizardFireBall = setup.querySelector('.setup-fireball-wrap');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var form = userDialog.querySelector('.setup-wizard-form');

  var getRandom = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = ERROR_NODE_STYLE.style;
    node.style.position = ERROR_NODE_STYLE.position;
    node.style.left = ERROR_NODE_STYLE.left;
    node.style.right = ERROR_NODE_STYLE.right;
    node.style.fontSize = ERROR_NODE_STYLE.fontSize;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
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

  var rgbToHex = function (rgb) {
    return '#' + ((1 << 24) + (Number(rgb.match(/\d{1,3}/gi)[0]) << 16) + (Number(rgb.match(/\d{1,3}/gi)[1]) << 8) + Number(rgb.match(/\d{1,3}/gi)[2])).toString(16).slice(1);
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

  var wizardCoatClickHandler = function () {
    var coatColorInput = setup.querySelector('.coat-color');
    wizardCoat.style.fill = getRandom(WIZARD_COAT_COLOR);
    coatColorInput.value = wizardCoat.style.fill;
  };

  var wizardEyesClickHandler = function () {
    var eyesColorInput = setup.querySelector('.eyes-color');
    wizardEyes.style.fill = getRandom(WIZARD_EYES_COLOR);
    eyesColorInput.value = wizardEyes.style.fill;
  };

  var wizardFireBallClickHandler = function () {
    var fireballColorInput = setup.querySelector('.fireball-color');
    wizardFireBall.style.backgroundColor = getRandom(WIZARD_FIRE_BAL_COLOR);
    fireballColorInput.value = rgbToHex(wizardFireBall.style.backgroundColor);
  };

  var formSubmitHandler = function (evt) {
    window.backend.upload(new FormData(form), function () {
      userDialog.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  };

  wizardCoat.addEventListener('click', wizardCoatClickHandler);

  wizardEyes.addEventListener('click', wizardEyesClickHandler);

  wizardFireBall.addEventListener('click', wizardFireBallClickHandler);

  form.addEventListener('submit', formSubmitHandler);
})();
