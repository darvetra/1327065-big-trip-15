// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateDestination = () => {
  const cities = [
    'Amsterdam',
    'Chamonix',
    'Geneva',
    'New York',
    'Praha',
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

const point = {
  'base_price': 1100,
  'date_from': '2019-07-10T22:55:56.845Z',
  'date_to': '2019-07-11T11:22:13.375Z',
  'destination': generateDestination(),
  'id': 0,
  'is_favorite': false,
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
};




