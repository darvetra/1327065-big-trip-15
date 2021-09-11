import AbstractObserver from './abstract-observer';

export default class Trip extends AbstractObserver {
  constructor() {
    super();
    this._trip = [];
  }

  setPoints(points) {
    this._trip = points.slice();
  }

  getPoints() {
    return this._trip;
  }
}
