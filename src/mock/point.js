// eslint-disable-next-line no-unused-vars
import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

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

const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};

export const generateDestination = () => ({
  'description': 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
  'name': generateCity(),
  'pictures': [
    {
      'src': 'http://picsum.photos/300/200?r=0.0762563005163317',
      'description': 'Chamonix parliament building',
    },
  ],
});

export const generatePoint = () => ({
  'base_price': getRandomInteger(700, 7000),
  'date_from': generateDate(),
  'date_to': generateDate(),
  'destination': 'Destination',
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

