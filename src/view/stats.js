import SmartView from './smart.js';

import {
  statCostsByPointType,
  sortEventTypesByData,
  statEventsCountByPointType,
  statPointsByType,
  calcTimeDiff,
  calcHumanDiffTime,
  getChart
} from '../utils/stats';

import {EVENT_TYPES} from '../const';

const BAR_HEIGHT = 55;

const renderMoneyChart = (moneyCtx, points) => {
  moneyCtx.height = BAR_HEIGHT * EVENT_TYPES.length;

  const costsByPointType = EVENT_TYPES.map((type) => statCostsByPointType(type, points));

  const sortedDataByCost = sortEventTypesByData(EVENT_TYPES, costsByPointType);
  const sortEventTitles = [];
  const sortEventData = [];
  sortedDataByCost.forEach((typeData) => {
    sortEventTitles.push(typeData.type.toUpperCase());
    sortEventData.push(typeData.sum);
  });

  return getChart(moneyCtx, sortEventTitles, sortEventData, 'MONEY', (val) => `€ ${val}`);
};

const renderTypeChart = (typeCtx, points) => {
  typeCtx.height = BAR_HEIGHT * EVENT_TYPES.length;

  const eventsCountByPointType = EVENT_TYPES.map((type) => statEventsCountByPointType(type, points));

  const sortedDataByType = sortEventTypesByData(EVENT_TYPES, eventsCountByPointType);
  const sortEventTitles = [];
  const sortEventData = [];
  sortedDataByType.forEach((typeData) => {
    sortEventTitles.push(typeData.type.toUpperCase());
    sortEventData.push(typeData.sum);
  });

  return getChart(typeCtx, sortEventTitles, sortEventData, 'TYPE', (val) => `${val}x`);
};

const renderTimeChart = (timeCtx, points) => {
  timeCtx.height = BAR_HEIGHT * EVENT_TYPES.length;

  const pointsByType = EVENT_TYPES.map((type) => statPointsByType(type, points));

  const durationByType = pointsByType.map((relevantPoints) => relevantPoints.map((point) => calcTimeDiff(point.dateTo, point.dateFrom)));
  const durationEventByPointType = durationByType.map((timePoints) => {
    if (timePoints.length !== 0) {
      return timePoints.reduce((sumTime, pointTime) => sumTime + pointTime, 0);
    }
    return 0;
  });

  const sortedDataByTime = sortEventTypesByData(EVENT_TYPES, durationEventByPointType);
  const sortEventTitles = [];
  const sortEventData = [];
  sortedDataByTime.forEach((typeData) => {
    sortEventTitles.push(typeData.type.toUpperCase());
    sortEventData.push(typeData.sum);
  });

  return getChart(timeCtx, sortEventTitles, sortEventData, 'TIME-SPEND', (val) => calcHumanDiffTime(val));
};

const createStatisticsTemplate = () => (
  `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="money" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="type" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
    </div>
  </section>`
);

export default class Stats extends SmartView {
  constructor(points) {
    super();
    this._points = points;

    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();

    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    const moneyCtx = this.getElement().querySelector('#money');
    const typeCtx = this.getElement().querySelector('#type');
    const timeCtx = this.getElement().querySelector('#time-spend');

    this._moneyChart = renderMoneyChart(moneyCtx, this._points);
    this._typeChart = renderTypeChart(typeCtx, this._points);
    this._timeChart = renderTimeChart(timeCtx, this._points);
  }
}
