import AbstractView from './abstract.js';

const createTripInfoTemplate = (tripInfo = {}) => {
  const {
    generalStartDate,
    generalEndDate,
  } = tripInfo;

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
      <p class="trip-info__dates">${generalStartDate}&nbsp;&mdash;&nbsp;${generalEndDate}</p>
    </div>
  </section>`;
};

export default class TripInfo extends AbstractView {
  constructor(info) {
    super();
    this._info = info;
  }

  getTemplate() {
    return createTripInfoTemplate(this._info);
  }
}
