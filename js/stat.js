'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var GAP = 50;
var FONT_GAP = 10;
var TEXT_HEIGHT = 15;
var barHeight = CLOUD_HEIGHT - GAP - TEXT_HEIGHT - GAP;
var BAR_WIDTH = 40;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP + FONT_GAP, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP + FONT_GAP, CLOUD_Y + FONT_GAP + TEXT_HEIGHT + FONT_GAP);
  // ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  var maxTime = getMaxElement(times);
  var iam = names.indexOf('Вы');

  for (var i = 0; i < names.length; i++) {
    if (i === iam) {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(250, 100%, ' + (Math.floor(Math.random() * 100)) + '%)';
    }
    ctx.fillRect(CLOUD_X + GAP + FONT_GAP + (GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - FONT_GAP - TEXT_HEIGHT - FONT_GAP - (barHeight * times[i]) / maxTime, BAR_WIDTH, (barHeight * times[i]) / maxTime);
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText(names[i], CLOUD_X + GAP + FONT_GAP + (GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - FONT_GAP - TEXT_HEIGHT);
    ctx.fillText(Math.floor(times[i]), CLOUD_X + GAP + FONT_GAP + (GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - FONT_GAP - TEXT_HEIGHT - FONT_GAP - TEXT_HEIGHT - (barHeight * times[i]) / maxTime, BAR_WIDTH);
  }
};
