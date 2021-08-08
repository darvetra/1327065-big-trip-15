import dayjs from 'dayjs';

/**
 * Функция из интернета по генерации случайного числа из диапазона
 * Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
 * @param a - минимальное значение
 * @param b - максимальное значение
 * @returns {number}
 */
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


/**
 * Функция, возвращающая случайное целое число из переданного диапазона включительно.
 * Результат: целое число из диапазона "от...до".
 * Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 *
 * @param min - минимальное значекние диапозона
 * @param max - максимальное значение диапозона
 */
export const getRandomIntInclusive = (min, max) => {
  const minNumber = Math.ceil(min);
  const maxNumber = Math.floor(max);
  if (minNumber >= maxNumber) {
    return 'Введены неверные значения';
  }

  // Максимум и минимум включаются
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
};


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

