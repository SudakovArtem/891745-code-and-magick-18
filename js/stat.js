'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 50;
var FONT_GAP = 10;
var TEXT_HEIGHT = 15;
var BAR_HEIGHT = CLOUD_HEIGHT - GAP - TEXT_HEIGHT - GAP;
var BAR_WIDTH = 40;
var SHADOW_GAP = 10;
var CLOUD_X_GAP = CLOUD_X + GAP + FONT_GAP;
var CLOUD_Y_GAP = CLOUD_HEIGHT - FONT_GAP - TEXT_HEIGHT - FONT_GAP;
var CURRENT_USER = 'Вы';
var CLOUD_HEADER = 'Ура вы победили!';
var CLOUD_HEADER_LIST = 'Список результатов:';

var getRandomLightness = function (h, s, l) {
  l = (Math.floor(Math.random() * 100));
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
};

var renderRect = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderCloud = function (ctx) {
  renderRect(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
};

var renderShadow = function (ctx) {
  renderRect(ctx, CLOUD_X, CLOUD_Y, '#fff');
};

var renderHeader = function (ctx) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText(CLOUD_HEADER, CLOUD_X_GAP, CLOUD_Y + FONT_GAP);
  ctx.fillText(CLOUD_HEADER_LIST, CLOUD_X_GAP, CLOUD_Y + FONT_GAP + TEXT_HEIGHT + FONT_GAP);
};

var renderGraph = function (ctx, names, times) {
  var maxTime = getMaxElement(times);
  var currentUser = names.indexOf(CURRENT_USER);

  for (var i = 0; i < names.length; i++) {
    if (i === currentUser) {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = getRandomLightness(250, 100, 50);
    }
    ctx.fillRect(CLOUD_X_GAP + (GAP + BAR_WIDTH) * i, CLOUD_Y_GAP - (BAR_HEIGHT * times[i]) / maxTime, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText(names[i], CLOUD_X_GAP + (GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - FONT_GAP - TEXT_HEIGHT);
    ctx.fillText(Math.floor(times[i]), CLOUD_X_GAP + (GAP + BAR_WIDTH) * i, CLOUD_Y_GAP - TEXT_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime, BAR_WIDTH);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx);
  renderShadow(ctx);
  renderHeader(ctx);
  renderGraph(ctx, names, times);
};
