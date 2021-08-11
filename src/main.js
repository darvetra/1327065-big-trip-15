import {render, RenderPosition} from './utils';

import TripInfoView from './view/trip-info.js';
import TripPriceInfoView from './view/trip-price.js';
import SiteMenuView from './view/site-menu.js';
import FilterView from './view/filter.js';
import SortView from './view/sort.js';
import PointListView from './view/point-list.js';
import PointAddAndEditView from './view/point-create-and-edit.js';
import PointItemView from './view/point-item.js';

import {generatePoint} from './mock/point';

const POINT_COUNT = 15;

const points = Array.from({ length: POINT_COUNT }, (item, index) => generatePoint(index));
const otherPoints = points.slice(1);

const sitePageHeaderElement = document.querySelector('.page-header');
const sitePageMainElement = document.querySelector('.page-main');

const renderPoint = (pointListElement, point) => {
  const pointComponent = new PointItemView(point);
  const pointEditComponent = new PointAddAndEditView(point, 0);

  const replaceCardToForm = () => {
    pointListElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToCard = () => {
    pointListElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceCardToForm();
  });

  pointEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  render(pointListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

// Хэдер
// Отрисовывает информацию о поездке (маршрут и дата)
const tripMainElement = sitePageHeaderElement.querySelector('.trip-main');
render(tripMainElement, new TripInfoView().getElement(), RenderPosition.AFTERBEGIN);

// Отрисовывает информацию о поездке (стоимость поездки)
const tripInfoElement = sitePageHeaderElement.querySelector('.trip-info');
render(tripInfoElement, new TripPriceInfoView().getElement(), RenderPosition.BEFOREEND);

// Отрисовывает меню
const tripControlsNavigationElement = sitePageHeaderElement.querySelector('.trip-controls__navigation');
render(tripControlsNavigationElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);

// Отрисовывает фильтр
const tripControlsFiltersElement = sitePageHeaderElement.querySelector('.trip-controls__filters');
render(tripControlsFiltersElement, new FilterView().getElement(), RenderPosition.BEFOREEND);

// Основная часть
const tripEventsElement = sitePageMainElement.querySelector('.trip-events');

// Отрисовывает сортировку
render(tripEventsElement, new SortView().getElement(), RenderPosition.BEFOREEND);

// Отрисовывает список точек маршрута
render(tripEventsElement, new PointListView().getElement(), RenderPosition.BEFOREEND);

const tripEventsListElement = sitePageMainElement.querySelector('.trip-events__list');

// Отрисовывает точку маршрута
for (let i = 0; i < otherPoints.length; i++) {
  renderPoint(tripEventsListElement, otherPoints[i]);
}

// Отрисовывает форму создания точки маршрута
render(tripEventsListElement, new PointAddAndEditView(otherPoints[otherPoints.length - 1], 1).getElement(), RenderPosition.BEFOREEND);

// Отрисовывает форму редактирования точки маршрута
render(tripEventsListElement, new PointAddAndEditView(points[0], 0).getElement(), RenderPosition.AFTERBEGIN);

