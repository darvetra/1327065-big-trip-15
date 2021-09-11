import {getRandomInteger} from './common';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

const MINUTE_GAP = 60 * 24 * 3; // 4320 минут = 72 часа = 3 дня

/**
 * Генерирует случайную дату в заданном диапазоне
 * @returns {Date}
 */
export const generateDate = () => {
  const maxMinuteGap = MINUTE_GAP;
  const minutesGap = getRandomInteger(-maxMinuteGap, maxMinuteGap);

  return dayjs().add(minutesGap, 'minute').toDate();
};

/**
 * Возвращает дату в формате YYYY-MM-DDTHH:mm, для атрибута datetime тега time
 * @param date
 * @returns {string|string}
 */
export const convertDateTime = (date) => date !== null
  ? dayjs(date).format('YYYY-MM-DDTHH:mm')
  : '';

/**
 * Возвращает день и месяц в "человеческом формате" - 'D MMM'
 * @param date
 * @returns {string|string}
 */
export const convertHumanDay = (date) => date !== null
  ? dayjs(date).format('D MMM')
  : '';

/**
 * Возвращает дату и время в "человеческом формате" - 'DD/MM/YY HH:mm'
 * @param date
 * @returns {string|string}
 */
export const convertHumanDateAndTime = (date) => date !== null
  ? dayjs(date).format('DD/MM/YY HH:mm')
  : '';

/**
 * Возвращает время в "человеческом формате" - 'HH:mm'
 * @param date
 * @returns {string|string}
 */
export const convertHumanTime = (date) => date !== null
  ? dayjs(date).format('HH:mm')
  : '';

/**
 * Рассчитывает разницу между датами в минутах
 * @returns {number}
 * @param reduced
 * @param deducted
 */
export const calculateMinuteDiff = (reduced, deducted) => dayjs(deducted).diff(dayjs(reduced), 'minute');

/**
 * Рассчитывает разницу между датами в минутах
 * Но выводит разницу в человеческом формате, в зависимости от значения этой самой разницы
 * @param reduced
 * @param deducted
 * @returns {string}
 */
export const  calculateTimeDiff = (reduced, deducted) => {
  const diff = dayjs(deducted).diff(dayjs(reduced), 'minute');
  // const diff = 4320 + 180 + 59; // 4320 минут = 72 часа = 3 дня

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

/**
 * На основе массива данных высчитывает информацию о поездке
 * @param routePoints
 * @returns {{generalEndDate: dayjs.Dayjs, generalStartDate: dayjs.Dayjs}}
 */
export const createTripInfo = (routePoints) => {
  dayjs.extend(minMax);

  const dateFromArray = routePoints.map((date) => dayjs(date.dateFrom));
  const dateToArray = routePoints.map((date) => dayjs(date.dateTo));

  return {
    generalStartDate: convertHumanDay(dayjs.min(dateFromArray)),
    generalEndDate: convertHumanDay(dayjs.max(dateToArray)),
  };
};
