// eslint-disable-next-line no-unused-vars
import dayjs from 'dayjs';


const MAXIMUM_NUMBER_OF_SENTENCES = 5;


/**
 * Функция из интернета по генерации случайного числа из диапазона
 * Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
 * @param a - минимальное значение
 * @param b - максимальное значение
 * @returns {number}
 */
const getRandomInteger = (a = 0, b = 1) => {
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
const getRandomIntInclusive = (min, max) => {
  const minNumber = Math.ceil(min);
  const maxNumber = Math.floor(max);
  if (minNumber >= maxNumber) {
    return 'Введены неверные значения';
  }

  // Максимум и минимум включаются
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
};


/**
 * Генерирует моковые данные - название города
 * @returns {string}
 */
const generateCity = () => {
  const cities = [
    'Amsterdam',
    'Chamonix',
    'Geneva',
    'New York',
    'Praha',
    'San Francisco',
    'Miami',
  ];

  const randomIndex = getRandomInteger(0, cities.length - 1);

  return cities[randomIndex];
};


/**
 * Генерирует моковые данные - тип точки маршрута
 * @returns {string}
 */
const generatePointType = () => {
  const pointType = [
    'taxi',
    'bus',
    'train',
    'ship',
    'drive',
    'flight',
    'check-in',
    'sightseeing',
    'restaurant',
  ];

  const randomIndex = getRandomInteger(0, pointType.length - 1);

  return pointType[randomIndex];
};


/**
 * Генерирует случайную дату в заданном диапазоне
 * @returns {Date}
 */
const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};


/**
 * Генерирует описание места назначения
 * @returns {string}
 */
const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];

  const sentenceNumbers = getRandomIntInclusive(1, MAXIMUM_NUMBER_OF_SENTENCES);
  const createDescription = (length) => {
    const result = [];
    for (let i = 1; i <= length; i++) {
      result.push(descriptions[getRandomIntInclusive(0, descriptions.length - 1)]);
    }
    return result.join(' ');
  };

  return createDescription(sentenceNumbers);
};


/**
 * Генерирует ссылку на случайную фотографию
 * @returns {`http://picsum.photos/248/152?r=${number}`}
 */
const generatePictures = () => {
  const pictureNumber = getRandomInteger(1, 1000);

  return `http://picsum.photos/248/152?r=${pictureNumber}`;
};


/**
 * Генерирует точку маршрута (Место назначения)
 * @returns {{name: string, description: string, pictures: [{src: string, description: string}]}}
 */
const generateDestination = () => ({
  'description': generateDescription(),
  'name': generateCity(),
  'pictures': [
    {
      'src': generatePictures(),
      'description': generateDescription(),
    },
  ],
});

export const generatePoint = () => ({
  'base_price': getRandomInteger(700, 7000),
  'date_from': generateDate(),
  'date_to': generateDate(),
  'destination': generateDestination(),
  'id': 0,
  'is_favorite': Boolean(getRandomInteger(0, 1)),
  'offers': [
    {
      'title': 'Choose meal',
      'price': 180,
    }, {
      'title': 'Upgrade to comfort class',
      'price': 50,
    },
  ],
  'type': generatePointType(),
});

