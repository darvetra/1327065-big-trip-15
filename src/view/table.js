import AbstractView from './abstract.js';

const createEventsTemplate = () => (
  `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>

  </section>`
);

export default class Table extends AbstractView {
  getTemplate() {
    return createEventsTemplate();
  }
}
