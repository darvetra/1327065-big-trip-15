import AbstractView from './abstract.js';

const createTripPriceTemplate = (price) => (
  `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
  </p>`
);

export default class TripPrice extends AbstractView {
  constructor(price) {
    super();
    this._price = price;
  }

  getTemplate() {
    return createTripPriceTemplate(this._price);
  }
}
