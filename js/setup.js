'use strict';

(function () {
  var WIZARD_QUANTITY = 4;
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIRE_BAL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var userDialog = document.querySelector('.setup');
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var wizardCoat = setup.querySelector('.wizard-coat');
  var wizardEyes = setup.querySelector('.wizard-eyes');
  var wizardFireBall = setup.querySelector('.setup-fireball-wrap');

  var getSomeIndex = function () {
    return 0.5 - Math.random();
  };

  var getRandom = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var getMock = function () {
    var wizards = [];
    var namesCounter = -1;
    var SecondNamesCounter = -1;

    WIZARD_NAMES.sort(getSomeIndex);
    WIZARD_SECOND_NAMES.sort(getSomeIndex);

    var getWizardNames = function (arr) {
      namesCounter = namesCounter + 1;
      return arr[namesCounter];
    };

    var getWizardSecondNames = function (arr) {
      SecondNamesCounter = SecondNamesCounter + 1;
      return arr[SecondNamesCounter];
    };

    for (var i = 0; i < WIZARD_QUANTITY; i++) {
      wizards[i] = {
        name: getWizardNames(WIZARD_NAMES) + ' ' + getWizardSecondNames(WIZARD_SECOND_NAMES),
        coatColor: getRandom(WIZARD_COAT_COLOR),
        eyesColor: getRandom(WIZARD_EYES_COLOR),
      };
    }
    return wizards;
  };

  var renderWizard = function (wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var renderAllWizard = function () {
    var similarListElement = userDialog.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();
    var wizards = getMock();

    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  renderAllWizard();

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

  wizardCoat.addEventListener('click', wizardCoatClickHandler);

  wizardEyes.addEventListener('click', wizardEyesClickHandler);

  wizardFireBall.addEventListener('click', wizardFireBallClickHandler);
})();
