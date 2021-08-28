import {render, RenderPosition, replace} from '../utils/render';

import SortView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import NoPointView from '../view/no-point.js';
import PointView from '../view/point';
import PointAddAndEditView from '../view/point-create-and-edit';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._sortComponent = new SortView();
    this._pointListComponent = new PointListView();
    this._noPointComponent = new NoPointView();
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderContentBlock в main.js

    render(this._tripContainer, this._pointListComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    // Метод для рендеринга сортировки
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(pointListElement, point) {
    // Метод, куда уйдёт логика по созданию и рендерингу компонетов путешествия,
    // текущая функция renderPoint в main.js
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

  _renderNoPoint() {
    // Метод для рендеринга заглушки
    render(this._tripContainer, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  _renderContentBlock() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderContentBlock в main.js

    if (this._tripPoints.length === 0) {
      this._renderNoPoint();
    } else {

      // Отрисовывает сортировку
      this._renderSort();

      // Отрисовывает список точек маршрута
      this._renderPoint();
    }
  }
}
