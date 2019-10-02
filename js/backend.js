'use strict';

(function () {
  var TIMEOUT_VALUE = 10000;
  var OK_STATUS = 200;
  var GET_URL = 'https://js.dump.academy/code-and-magick/data';
  var POST_URL = 'https://js.dump.academy/code-and-magick';

  var getXhr = function () {
    return new XMLHttpRequest();
  };

  var getXhrListener = function (xhr, onLoad, onError) {
    xhr.responseType = 'json';

    var LOAD_ERROR_MESSAGE = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
    var ERROR_MESSAGE = 'Произошла ошибка соединения';
    var TIMEOUT_ERROR_MESSAGE = 'Запрос не успел выполниться за ' + xhr.timeout + 'мс';
    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS) {
        onLoad(xhr.response);
      } else {
        onError(LOAD_ERROR_MESSAGE);
      }
    });
    xhr.addEventListener('error', function () {
      onError(ERROR_MESSAGE);
    });
    xhr.addEventListener('timeout', function () {
      onError(TIMEOUT_ERROR_MESSAGE);
    });

    xhr.timeout = TIMEOUT_VALUE;
  };

  var load = function (onLoad, onError) {
    var xhr = getXhr();
    var URL = GET_URL;
    getXhrListener(xhr, onLoad, onError);
    xhr.open('GET', URL);
    xhr.send();
  };

  var upload = function (data, onLoad, onError) {
    var xhr = getXhr();
    var URL = POST_URL;

    getXhrListener(xhr, onLoad, onError);
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload,
  };
})();
