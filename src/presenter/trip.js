
import SortView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import NoPointView from '../view/no-point.js';

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
  }

  _renderSort() {
    // Метод для рендеринга сортировки
  }

  _renderPoint() {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов путешествия,
    // текущая функция renderPoint в main.js
  }

  _renderNoPoint() {
    // Метод для рендеринга заглушки
  }

  _renderContentBlock() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderContentBlock в main.js
  }
}
