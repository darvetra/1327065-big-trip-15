import {render, RenderPosition} from '../utils/render.js';
import {sortByDate, sortByTime, sortByPrice} from '../utils/sort.js';
import {SortType} from '../const.js';

import EventsView from '../view/events.js';
import SortView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import NoPointView from '../view/no-point.js';

import PointPresenter from './point.js';

export default class Trip {
  constructor(tripContainer, tripModel) {
    this._tripModel = tripModel;
    this._tripContainer = tripContainer;
    this._pointPresenter = new Map();
    this._currentSortType = SortType.DAY;

    this._eventsComponent = new EventsView();
    this._sortComponent = new SortView();
    this._pointListComponent = new PointListView();
    this._noPointComponent = new NoPointView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._tripModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._tripContainer, this._eventsComponent, RenderPosition.BEFOREEND);
    render(this._eventsComponent, this._pointListComponent, RenderPosition.BEFOREEND);

    this._renderContentBlock();
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SortType.DAY:
        return this._tripModel.getPoints().slice().sort(sortByDate);
      case SortType.TIME:
        return this._tripModel.getPoints().slice().sort(sortByTime);
      case SortType.PRICE:
        return this._tripModel.getPoints().slice().sort(sortByPrice);
    }

    return this._tripModel.getPoints();
  }

  _handleSortTypeChange(sortType) {
    // - Сортируем задачи
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    // - Очищаем список
    this._clearPointList();

    // - Рендерим список заново
    this._renderPointList();
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  // _handlePointChange(updatedPoint) {
  // Здесь будем вызывать обновление модели
  // this._pointPresenter.get(updatedPoint.id).init(updatedPoint, this._destinationCities);
  // }

  _handleViewAction(actionType, updateType, update) {
    // eslint-disable-next-line no-console
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  }

  _handleModelEvent(updateType, data) {
    // eslint-disable-next-line no-console
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  }


  _renderSort() {
    // Метод для рендеринга сортировки
    render(this._eventsComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoint(point) {
    // Метод, с логикой по созданию и рендерингу точки маршрута
    const pointPresenter = new PointPresenter(this._pointListComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point, this._destinationCities);
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _clearPointList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }

  _renderPointList() {
    // метод по отрисовки точек маршрута в списке
    this._getPoints().forEach((point) => {
      this._renderPoint(point);
    });
  }

  _renderNoPoint() {
    // Метод для рендеринга заглушки
    render(this._eventsComponent, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  _renderContentBlock() {
    // Метод для инициализации (начала работы) модуля

    if (this._getPoints().length === 0) {
      this._renderNoPoint();
    } else {
      // Отрисовывает сортировку
      this._renderSort();

      // Отрисовывает точки маршрута  в списке
      this._renderPointList();
    }
  }
}
