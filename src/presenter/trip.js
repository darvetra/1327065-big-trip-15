import {render, RenderPosition} from '../utils/render.js';
import {updateItem} from '../utils/common.js';

import EventsView from '../view/events.js';
import SortView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import NoPointView from '../view/no-point.js';

import PointPresenter from './point.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._pointPresenter = new Map();

    this._eventsComponent = new EventsView();
    this._sortComponent = new SortView();
    this._pointListComponent = new PointListView();
    this._noPointComponent = new NoPointView();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    // Метод для инициализации (начала работы) модуля,

    render(this._tripContainer, this._eventsComponent, RenderPosition.BEFOREEND);
    render(this._eventsComponent, this._pointListComponent, RenderPosition.BEFOREEND);

    this._renderContentBlock();
  }

  // eslint-disable-next-line no-unused-vars
  _handleSortTypeChange(sortType) {
    // - Сортируем задачи
    // - Очищаем список
    // - Рендерим список заново
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _renderSort() {
    // Метод для рендеринга сортировки
    render(this._eventsComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoint(container, point) {
    // Метод, с логикой по созданию и рендерингу точки маршрута

    const pointPresenter = new PointPresenter(this._pointListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _clearPointList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }

  _renderPointList(container, items) {
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
      this._renderPointList(this._pointListComponent, this._tripPoints);
    }
  }
}
