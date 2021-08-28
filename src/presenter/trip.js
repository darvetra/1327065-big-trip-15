import {render, RenderPosition, replace} from '../utils/render.js';

import EventsView from '../view/events.js';
import SortView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import NoPointView from '../view/no-point.js';
import PointView from '../view/point.js';
import PointAddAndEditView from '../view/point-create-and-edit.js';

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

    const pointComponent = new PointView(point);
    const pointEditComponent = new PointAddAndEditView(point, 0);

    const replaceCardToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToCard = () => {
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormRollupHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(this._pointListComponent, pointComponent, RenderPosition.BEFOREEND);
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
