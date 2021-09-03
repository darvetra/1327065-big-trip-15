import dayjs from 'dayjs';
import {calculateMinuteDiff} from './date.js';

/**
 * Функция для метода sort
 * Сортировка по дате
 * @param pointA
 * @param pointB
 */
export const sortByDate = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

/**
 * Функция для метода sort
 * Сортировка по длительности поездки
 * @param pointA
 * @param pointB
 * @returns {number}
 */
export const sortByTime = (pointA, pointB) => {
  const durationPointA = calculateMinuteDiff(pointA.dateFrom, pointA.dateTo);
  const durationPointB = calculateMinuteDiff(pointB.dateFrom, pointB.dateTo);

  if (durationPointA > durationPointB) {
    return -1;
  }

  if (durationPointA < durationPointB) {
    return 1;
  }

  return 0;
};

/**
 * Функция для метода sort
 * Сортировка по цене
 * @param pointA
 * @param pointB
 * @returns {number}
 */
export const sortByPrice = (pointA, pointB) => {
  if (pointA.basePrice > pointB.basePrice) {
    return -1;
  }

  if (pointA.basePrice < pointB.basePrice) {
    return 1;
  }

  return 0;
};
