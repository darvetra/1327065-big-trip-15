import dayjs from 'dayjs';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export const statCostsByPointType = (type, events) =>
  events
    .filter((point) => point.type === type)
    .reduce((total, point) => total + point.basePrice, 0);

export const statEventsCountByPointType = (type, events) =>
  events
    .filter((point) => point.type === type).length;

export const statPointsByType = (type, events) =>
  events
    .filter((point) => point.type === type);

export const calcTimeDiff = (dateTo, dateFrom) => {
  const endDate = dayjs(dateTo);
  const startDate = dayjs(dateFrom);
  return endDate.diff(startDate, 'minute');
};

export const  calcHumanDiffTime = (diff) => {
  let timeDiff = '';
  const days = Math.floor(diff/(60*24));
  let hours =  Math.floor(diff/60);
  const minutes = diff%60;

  if(diff < 60){
    timeDiff = `${diff}M`;
  }

  if(diff >= 60 && diff < (60*24)){
    timeDiff = `${hours}H ${minutes}M`;
  }

  if(diff >= (60*24)){
    hours = Math.floor(( diff - (days * 60 * 24) )/60);
    timeDiff = `${days}D ${hours}H ${minutes}M`;
  }

  return timeDiff;
};

export const sortEventTypesByData = (eventTypes, sumDataByType) => {
  const dataTypes = eventTypes.map((element, i) => ({
    type: element,
    sum: sumDataByType[i],
  }));
  return dataTypes.sort((dataTypeA, dataTypeB) => dataTypeB.sum - dataTypeA.sum);
};

export const getChart = (ctx, labels, data, title, formatter) => (
  new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: labels,
      datasets: [{
        data: data,
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
          formatter: formatter,
        },
      },
      title: {
        display: true,
        text: title,
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
  })
);
