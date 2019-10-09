'use strict';

(function () {
  var coatColor;
  var eyesColor;
  var wizards = [];

  var ERROR_NODE_STYLE = {
    style: 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;',
    position: 'absolute',
    left: 0,
    right: 0,
    fontSize: '30px',
  };

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var updateWizards = function () {
    window.render(wizards.slice().
    sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    }));
  };

  window.wizard.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  window.wizard.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
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

  window.similar = {
    errorHandler: errorHandler
  };
})();
