import {generateDate, getRandomIntInclusive, getRandomInteger} from '../utils.js';

const MAXIMUM_NUMBER_OF_SENTENCES = 5;


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
 * Генерирует случайный(ые) оффер(ы) в точке маршрута
 * @returns {*[]}
 */
const generateOffers = () => {

  const numberOffers = getRandomInteger(0, 2);

  const getRandomTitle = () => {
    const titles = [
      'Choose meal',
      'Upgrade to comfort class',
      'Order Uber',
      'Add luggage',
      'Switch to comfort',
      'Rent a car',
      'Add breakfast',
      'Book tickets',
      'Lunch in city',
    ];
    const randomIndex = getRandomInteger(0, titles.length - 1);

    return titles[randomIndex];
  };

  const createOffer = (length) => {
    const result = [];
    for (let i = 1; i <= length; i++) {
      const offer = {
        'title': getRandomTitle(),
        'price': getRandomInteger(10, 200),
      };

      result.push(offer);
    }

    return result;
  };

  return createOffer(numberOffers);
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
  'basePrice': getRandomInteger(1, 300),
  'dateFrom': generateDate(),
  'dateTo': generateDate(),
  'destination': generateDestination(),
  'id': 0,
  'isFavorite': Boolean(getRandomInteger(0, 1)),
  'offers': generateOffers(),
  'type': generatePointType(),
});

