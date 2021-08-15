import {createElement} from '../utils.js';

const createTripInfoTemplate = (tripInfo = {}) => {
  const {
    travelStartDate,
    travelEndDate,
  } = tripInfo;

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
      <p class="trip-info__dates">${travelStartDate}&nbsp;&mdash;&nbsp;${travelEndDate}</p>
    </div>
  </section>`;
};

export default class TripInfo {
  constructor(info) {
    this._info = info;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._info);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
