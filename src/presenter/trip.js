import {render, RenderPosition} from '../utils/render.js';

import EventsView from '../view/events.js';
import SortView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import NoPointView from '../view/no-point.js';

import PointPresenter from './point.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._eventsComponent = new EventsView();
    this._sortComponent = new SortView();
    this._pointListComponent = new PointListView();
    this._noPointComponent = new NoPointView();
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    // Метод для инициализации (начала работы) модуля,

    render(this._tripContainer, this._eventsComponent, RenderPosition.BEFOREEND);
    render(this._eventsComponent, this._pointListComponent, RenderPosition.BEFOREEND);

    this._renderContentBlock();
  }

  _renderSort() {
    // Метод для рендеринга сортировки
    render(this._eventsComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(container, point) {
    // Метод, с логикой по созданию и рендерингу точки маршрута

    const pointPresenter = new PointPresenter(this._pointListComponent);
    pointPresenter.init(point);
  }

  _renderPoints(container, items) {
    // метод по отрисовки точек маршрута в списке
    items.forEach((point) => {
      this._renderPoint(container, point);
    });
  }

  _renderNoPoint() {
    // Метод для рендеринга заглушки
    render(this._eventsComponent, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  _renderContentBlock() {
    // Метод для инициализации (начала работы) модуля

    if (this._tripPoints.length === 0) {
      this._renderNoPoint();
    } else {

      // Отрисовывает сортировку
      this._renderSort();

      // Отрисовывает точки маршрута  в списке
      this._renderPoints(this._pointListComponent, this._tripPoints);


    }
  }
}