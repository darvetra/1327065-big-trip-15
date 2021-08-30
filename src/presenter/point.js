import {render, RenderPosition, replace} from '../utils/render.js';

import PointView from '../view/point.js';
import PointAddAndEditView from '../view/point-create-and-edit.js';

export default class Point {
  constructor(pointListContainer) {
    this._pointListContainer = pointListContainer;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormRollup = this._handleFormRollup.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(point) {
    this._point = point;

    this._pointComponent = new PointView(point);
    this._pointEditComponent = new PointAddAndEditView(point, 0);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setFormRollupHandler(this._handleFormSubmit);

    render(this._pointListContainer, this._pointComponent, RenderPosition.BEFOREEND);
  }

  _replaceCardToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _replaceFormToCard() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToCard();
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToCard();
  }

  _handleFormRollup() {
    this._replaceFormToCard();
  }
}
