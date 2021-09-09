import {render, RenderPosition} from '../utils/render.js';
import {updateItem} from '../utils/common.js';
import {sortByDate, sortByTime, sortByPrice} from '../utils/sort.js';
import {SortType} from '../const.js';

import EventsView from '../view/events.js';
import SortView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import NoPointView from '../view/no-point.js';

import PointPresenter from './point.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._pointPresenter = new Map();
    this._currentSortType = SortType.DAY;

    this._eventsComponent = new EventsView();
    this._sortComponent = new SortView();
    this._pointListComponent = new PointListView();
    this._noPointComponent = new NoPointView();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripPoints, destinationCities) {
    // Метод для инициализации (начала работы) модуля
    this._tripPoints = tripPoints.slice();
    this._destinationCities = destinationCities.slice();

    // 1. В отличии от сортировки по любому параметру,
    // исходный порядок можно сохранить только одним способом -
    // сохранив исходный массив:
    this._sourcedTripPoints = tripPoints.slice();

    render(this._tripContainer, this._eventsComponent, RenderPosition.BEFOREEND);
    render(this._eventsComponent, this._pointListComponent, RenderPosition.BEFOREEND);

    this._renderContentBlock();
  }

  _sortPoints(sortType) {
    this._currentSortType = sortType;

    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _tripPoints
    switch (this._currentSortType) {
      case SortType.DAY:
        this._tripPoints = this._tripPoints.sort(sortByDate);
        break;
      case SortType.TIME:
        this._tripPoints = this._tripPoints.sort(sortByTime);
        break;
      case SortType.PRICE:
        this._tripPoints = this._tripPoints.sort(sortByPrice);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _tripPoints исходный массив
        this._tripPoints = this._sourcedTripPoints.slice();
    }
  }

  _handleSortTypeChange(sortType) {
    // - Сортируем задачи
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);

    // - Очищаем список
    this._clearPointList();

    // - Рендерим список заново
    this._renderPointList(this._pointListComponent, this._tripPoints);
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._sourcedTripPoints = updateItem(this._sourcedTripPoints, updatedPoint);
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint, this._destinationCities);
  }

  _renderSort() {
    // Метод для рендеринга сортировки
    render(this._eventsComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoint(container, point) {
    // Метод, с логикой по созданию и рендерингу точки маршрута

    const pointPresenter = new PointPresenter(this._pointListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point, this._destinationCities);
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
      this._renderPointList(this._pointListComponent, this._tripPoints.sort(sortByDate));
    }
  }
}
