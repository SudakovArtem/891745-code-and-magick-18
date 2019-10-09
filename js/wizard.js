'use strict';

(function () {
  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIRE_BAL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setup = document.querySelector('.setup'); // повтор
  var wizardCoat = setup.querySelector('.wizard-coat');
  var wizardEyes = setup.querySelector('.wizard-eyes');
  var wizardFireBall = setup.querySelector('.setup-fireball-wrap');

  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };

  var getRandom = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var rgbToHex = function (rgb) {
    return '#' + ((1 << 24) + (Number(rgb.match(/\d{1,3}/gi)[0]) << 16) + (Number(rgb.match(/\d{1,3}/gi)[1]) << 8) + Number(rgb.match(/\d{1,3}/gi)[2])).toString(16).slice(1);
  };

  var wizardCoatClickHandler = function () {
    var coatColorInput = setup.querySelector('.coat-color');
    var newColor = getRandom(WIZARD_COAT_COLOR);

    wizardCoat.style.fill = newColor;
    coatColorInput.value = wizardCoat.style.fill;
    wizard.onCoatChange(newColor);
  };

  var wizardEyesClickHandler = function () {
    var eyesColorInput = setup.querySelector('.eyes-color');
    var newColor = getRandom(WIZARD_EYES_COLOR);

    wizardEyes.style.fill = newColor;
    eyesColorInput.value = wizardEyes.style.fill;
    wizard.onEyesChange(newColor);
  };

  var wizardFireBallClickHandler = function () {
    var fireballColorInput = setup.querySelector('.fireball-color');
    wizardFireBall.style.backgroundColor = getRandom(WIZARD_FIRE_BAL_COLOR);
    fireballColorInput.value = rgbToHex(wizardFireBall.style.backgroundColor);
  };

  wizardCoat.addEventListener('click', wizardCoatClickHandler);

  wizardEyes.addEventListener('click', wizardEyesClickHandler);

  wizardFireBall.addEventListener('click', wizardFireBallClickHandler);

  window.wizard = wizard;
})();

