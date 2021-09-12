import AbstractObserver from '../utils/abstract-observer.js';

export default class Trip extends AbstractObserver {
  constructor() {
    super();
    this._tripPoints = [];
  }

  setPoints(tripPoints, destinationCities) {
    this._tripPoints = tripPoints.slice();
    this._destinationCities = destinationCities.slice();
  }

  getPoints() {
    return this._tripPoints;
  }
}
