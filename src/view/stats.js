import SmartView from './smart.js';

import {statCostsByPointType, sortEventTypesByData, statEventsCountByPointType} from '../utils/stats';
import {EVENT_TYPES} from '../const';

import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BAR_HEIGHT = 55;

// timeCtx.height = BAR_HEIGHT * 5;

const renderMoneyChart = (moneyCtx, points) => {
  moneyCtx.height = BAR_HEIGHT * EVENT_TYPES.length;

  const costsByPointType = EVENT_TYPES.map((type) => statCostsByPointType(type, points));

  const sortedDataTypesCost = sortEventTypesByData(EVENT_TYPES, costsByPointType);
  const sortEventTitles = [];
  const sortEventData = [];
  sortedDataTypesCost.forEach((costTypeData) => {
    sortEventTitles.push(costTypeData.costType.toUpperCase());
    sortEventData.push(costTypeData.sum);
  });

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: sortEventTitles,
      datasets: [{
        data: sortEventData,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTypeChart = (typeCtx, points) => {
  typeCtx.height = BAR_HEIGHT * EVENT_TYPES.length;

  const eventsCountByPointType = EVENT_TYPES.map((type) => statEventsCountByPointType(type, points));

  const sortedDataTypesCost = sortEventTypesByData(EVENT_TYPES, eventsCountByPointType);
  const sortEventTitles = [];
  const sortEventData = [];
  sortedDataTypesCost.forEach((costTypeData) => {
    sortEventTitles.push(costTypeData.costType.toUpperCase());
    sortEventData.push(costTypeData.sum);
  });

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: sortEventTitles,
      datasets: [{
        data: sortEventData,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

// const renderTimeChart = (timeCtx) => {
//
// }

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
    // return createStatisticsTemplate(this._data);
    return createStatisticsTemplate();
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    // const {points, dateFrom, dateTo} = this._data;
    const moneyCtx = this.getElement().querySelector('#money');
    const typeCtx = this.getElement().querySelector('#type');
    // const timeCtx = this.getElement().querySelector('#time-spend');

    this._moneyChart = renderMoneyChart(moneyCtx, this._points);
    this._typeChart = renderTypeChart(typeCtx, this._points);
    // this._timeChart = renderTimeChart(timeCtx, points, dateFrom, dateTo);
  }
}
