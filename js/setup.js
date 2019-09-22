'use strict';

var WIZARD_QUANTITY = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var userDialog = document.querySelector('.setup');

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
  userDialog.classList.remove('hidden');
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  var wizards = getMock();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

renderAllWizard();
