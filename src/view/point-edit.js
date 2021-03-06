import SmartView from './smart.js';
import {DESTINATION_CITIES, EVENT_TYPES} from '../const.js';
import {convertHumanDateAndTime} from '../utils/date.js';

import he from 'he';

import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  basePrice: '',
  dateFrom: '',
  dateTo: '',
  destination: {
    description: '',
    name: DESTINATION_CITIES[0],
    pictures: [],
  },
  id: '',
  isFavorite: false,
  offers: [
    {
      title: '',
      price: '',
    },
  ],
  type: EVENT_TYPES[0],
};

const createEventOfferTemplate = (offer = {}) => {
  const {
    title,
    price,
  } = offer;

  return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
    <label class="event__offer-label" for="event-offer-seats-1">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`;
};

const createEventOfferList = (offersArray) => offersArray.reduce((accumulator, currentValue) => `${accumulator} ${createEventOfferTemplate(currentValue)}`, ' ');

const createDestinationPicturesTemplate = (picture = {}) => {
  const {
    src,
    description,
  } = picture;

  return `<img class="event__photo" src="${src}" alt="${description}">`;
};

const createDestinationPicturesList = (picturesArray) => picturesArray.reduce((accumulator, currentValue) => `${accumulator} ${createDestinationPicturesTemplate(currentValue)}`, ' ');

const createEditPointControlsTemplate = () => (
  `<button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`
);

const createAddPointControlsTemplate = () => (
  '<button class="event__reset-btn" type="reset">Cancel</button>'
);

const createAddPointPicturesContainerTemplate = (picturesArray) => (
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${picturesArray}
    </div>
  </div>`
);

const createPointEditEventTypeTemplate = () => (
  EVENT_TYPES.map((eventType) => `<div class="event__type-item">
    <input id="event-type-${eventType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}">
    <label class="event__type-label event__type-label--${eventType}" for="event-type-${eventType}-1" style="text-transform: capitalize">${eventType}</label>
  </div>`).join('')
);

const createPointEditDestinationCityTemplate = () => (
  DESTINATION_CITIES.map((destinationCity) => `<option value="${he.encode(destinationCity)}"></option>`).join('')
);

const createEditPointTemplate = (data = {}, isAddingForm) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    offers,
    type,
  } = data;

  // ??????????
  const city = destination.name;

  // ???????? ?? ??????????
  const dateAndTimeFromView = convertHumanDateAndTime(dateFrom);
  const dateAndTimeToView = convertHumanDateAndTime(dateTo);

  // ???????????? ????????????????????
  const pointControls = isAddingForm ? createAddPointControlsTemplate() : createEditPointControlsTemplate();

  // ????????????
  const offerList = createEventOfferList(offers);

  // ????????????????
  const destinationDescription = destination.description;

  // ????????????????????
  const destinationPictures = createDestinationPicturesList(destination.pictures);
  const pointPicturesContainer = isAddingForm ? createAddPointPicturesContainerTemplate(destinationPictures) : '';

  // ?????? ????????????????????
  const eventTypes = createPointEditEventTypeTemplate(EVENT_TYPES);

  // ?????????? ????????????????????
  const destinationCity = createPointEditDestinationCityTemplate(DESTINATION_CITIES);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              ${eventTypes}

            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(city)}" list="destination-list-1">
          <datalist id="destination-list-1">

            ${destinationCity}

          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateAndTimeFromView}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateAndTimeToView}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}" pattern="^[ 0-9]+$">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        ${pointControls}
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
              <label class="event__offer-label" for="event-offer-luggage-1">
                <span class="event__offer-title">Add luggage</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">30</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
              <label class="event__offer-label" for="event-offer-comfort-1">
                <span class="event__offer-title">Switch to comfort class</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">100</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
              <label class="event__offer-label" for="event-offer-meal-1">
                <span class="event__offer-title">Add meal</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">15</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
              <label class="event__offer-label" for="event-offer-seats-1">
                <span class="event__offer-title">Choose seats</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">5</span>
              </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
              <label class="event__offer-label" for="event-offer-train-1">
                <span class="event__offer-title">Travel by train</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">40</span>
              </label>
            </div>

            ${offerList}

          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destinationDescription}</p>

          ${destination.pictures.length > 0 ? pointPicturesContainer: ''}

        </section>
      </section>
    </form>
  </li>`;
};

export default class PointEdit extends SmartView {
  constructor(isAddingForm, point = BLANK_POINT, destination) {
    super();
    this._data = PointEdit.parsePointToData(point);
    this._destination = destination;
    this._isAddingForm = isAddingForm;
    this._datepickerStartTime = null;
    this._datepickerEndTime = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._formRollupHandler = this._formRollupHandler.bind(this);
    this._formResetHandler = this._formResetHandler.bind(this);
    this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    this._dateToChangeHandler = this._dateToChangeHandler.bind(this);
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._destinationCityInputHandler = this._destinationCityInputHandler.bind(this);
    this._inputDestinationValidateHandler = this._inputDestinationValidateHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  // ?????????????????????? ?????????? ???????????????? removeElement,
  // ?????????? ?????? ???????????????? ???????????????? ?????????? ???????????????? ??????????????????
  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  reset(point) {
    this.updateData(
      PointEdit.parsePointToData(point),
    );
  }

  getTemplate() {
    return createEditPointTemplate(this._data, this._isAddingForm);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setFormResetHandler(this._callback.formReset);
    this.setFormRollupHandler(this._callback.formReset);
  }

  _setDatepicker() {
    if (this._datepickerStartTime) {
      // ?? ???????????? ???????????????????? ???????????????????? ?????????????? ?????????????????????????????? DOM-????????????????,
      // ?????????????? ?????????????? flatpickr ?????? ??????????????????????????
      this._datepickerStartTime.destroy();
      this._datepickerStartTime = null;
    }

    if (this._datepickerEndTime) {
      // ?? ???????????? ???????????????????? ???????????????????? ?????????????? ?????????????????????????????? DOM-????????????????,
      // ?????????????? ?????????????? flatpickr ?????? ??????????????????????????
      this._datepickerEndTime.destroy();
      this._datepickerEndTime = null;
    }

    this._datepickerStartTime = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      {
        locale: {firstDayOfWeek: 1},
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        // eslint-disable-next-line camelcase
        time_24hr: true,
        defaultDate: this._data.dateFrom,
        onChange: this._dateFromChangeHandler, // ???? ?????????????? flatpickr ???????????????? ?????? ????????????
      },
    );

    this._datepickerEndTime = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      {
        minDate: this._datepickerStartTime.selectedDates[0],
        locale: {firstDayOfWeek: 1},
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        // eslint-disable-next-line camelcase
        time_24hr: true,
        defaultDate: this._data.dateTo,
        onChange: this._dateToChangeHandler, // ???? ?????????????? flatpickr ???????????????? ?????? ????????????
      },
    );
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__type-group')
      .addEventListener('change', this._eventTypeChangeHandler);

    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('input', this._destinationCityInputHandler);

    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('input', this._inputDestinationValidateHandler);
  }

  _dateFromChangeHandler([userDate]) {
    this.updateData({
      dateFrom: userDate,
    });
  }

  _dateToChangeHandler([userDate]) {
    this.updateData({
      dateTo: userDate,
    });
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(PointEdit.parseDataToPoint(this._data));
  }

  setDeleteClickHandler(callback) {
    if(this._isAddingForm === true) {
      return;
    }

    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(PointEdit.parseDataToPoint(this._data));
  }

  setFormResetHandler(callback) {
    if(this._isAddingForm === false) {
      return;
    }

    this._callback.formReset = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formResetHandler);
  }

  _formResetHandler(evt) {
    evt.preventDefault();
    this._callback.formReset();
  }

  setFormRollupHandler(callback) {
    if(this._isAddingForm) {
      return;
    }

    this._callback.formReset = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._formResetHandler);
  }

  _formRollupHandler(evt) {
    evt.preventDefault();
    this._callback.formReset();
  }

  _inputDestinationValidateHandler(evt) {
    const inputDestination = this.getElement().querySelector('.event__input--destination');
    const targetCity = this._destination.find((item) => item.name === evt.target.value);
    const redBorder = 'red auto 1px';

    if (evt.target.value === '') {
      inputDestination.setCustomValidity('???????? ???? ?????????? ???????? ????????????');
      inputDestination.style.outline = redBorder;
    } else if (targetCity === undefined) {
      inputDestination.setCustomValidity('???????????????? ?????????? ???? ?????????????????????????? ????????????');
      inputDestination.style.outline = redBorder;
    } else {
      inputDestination.setCustomValidity('');
      inputDestination.style.outline = '';
    }

    inputDestination.reportValidity();
  }

  _destinationCityInputHandler(evt) {
    evt.preventDefault();
    const targetCity = this._destination.find((item) => item.name === evt.target.value);

    this.updateData({
      destination:
        {
          description: targetCity.description,
          name: evt.target.value,
          pictures: targetCity.pictures,
        },
    }, true);
  }

  _eventTypeChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
    });
  }

  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    return data;
  }
}
