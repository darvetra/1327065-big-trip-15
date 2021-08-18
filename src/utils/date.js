import {getRandomInteger} from './common';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

/**
 * Генерирует случайную дату в заданном диапазоне
 * @returns {Date}
 */
export const generateDate = () => {
  const maxMinuteGap = 4320;
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
 * Возвращает день и месяц в "человеческом формате" - 'D MMMM'
 * @param date
 * @returns {string|string}
 */
export const convertHumanDay = (date) => date !== null
  ? dayjs(date).format('D MMMM')
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
 * На основе массива данных высчитывает информацию о поездке
 * @param routePoints
 * @returns {{travelEndDate: dayjs.Dayjs, travelStartDate: dayjs.Dayjs}}
 */
export const createTripInfo = (routePoints) => {
  dayjs.extend(minMax);

  const dateFromArray = routePoints.map((date) => dayjs(date.dateFrom));
  const dateToArray = routePoints.map((date) => dayjs(date.dateTo));

  return {
    travelStartDate: convertHumanDay(dayjs.min(dateFromArray)),
    travelEndDate: convertHumanDay(dayjs.max(dateToArray)),
  };
};
