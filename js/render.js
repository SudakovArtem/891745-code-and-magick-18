'use strict';

var userDialog = document.querySelector('.setup'); // повтор
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;


var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

  return wizardElement;
};

window.render = function (data) {
  var takeNumber = data.length > 4 ? 4 : data.length;
  similarListElement.innerHTML = '';
  for (var i = 0; i < takeNumber; i++) {
    similarListElement.appendChild(renderWizard(data[i]));
  }
};
