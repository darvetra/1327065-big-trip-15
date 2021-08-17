import {calculateMinuteDiff, convertDateTime, convertHumanDay, convertHumanTime} from '../utils.js';
import AbstractView from './abstract.js';

const createEventOfferTemplate = (offer = {}) => {
  const {
    title,
    price,
  } = offer;

  return `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>`;
};

const createEventOfferList = (offersArray) => offersArray.reduce((accumulator, currentValue) => `${accumulator} ${createEventOfferTemplate(currentValue)}`, ' ');

const createPointItemTemplate = (pointItem = {}) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    isFavorite,
    offers,
    type,
  } = pointItem;

  // Дата и время
  const dateFromView = convertHumanDay(dateFrom);
  const dateFromDateTime = convertDateTime(dateFrom);
  const dateToDateTime = convertDateTime(dateTo);
  const timeFromView = convertHumanTime(dateFrom);
  const timeToView = convertHumanTime(dateTo);
  const minuteDiff = calculateMinuteDiff(dateFrom, dateTo);

  // Город
  const city = destination.name;

  // Избранное
  const favoriteClassName = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  // Офферы
  const offerList = createEventOfferList(offers);

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${dateFromView}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="${type}">
      </div>
      <h3 class="event__title">${type} ${city}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFromDateTime}">${timeFromView}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateToDateTime}">${timeToView}</time>
        </p>
        <p class="event__duration">${minuteDiff}M</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offerList}
      </ul>
      <button class="event__favorite-btn ${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class Point extends AbstractView {
  constructor(point) {
    super();
    this._point = point;

    // 4. Теперь обработчик - метод класса, а не стрелочная функция.
    // Поэтому при передаче в addEventListener он теряет контекст (this),
    // а с контекстом - доступ к свойствам и методам.
    // Чтобы такого не происходило, нужно насильно
    // привязать обработчик к контексту с помощью bind
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createPointItemTemplate(this._point);
  }

  _editClickHandler(evt) {
    evt.preventDefault();

    // 3. А внутри абстрактного обработчика вызовем колбэк
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    // Мы могли бы сразу передать callback в addEventListener,
    // но тогда бы для удаления обработчика в будущем,
    // нам нужно было бы производить это снаружи, где-то там,
    // где мы вызывали setClickHandler, что не всегда удобно

    // 1. Поэтому колбэк мы запишем во внутреннее свойство
    this._callback.editClick = callback;

    // 2. В addEventListener передадим абстрактный обработчик
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }
}
