import {renderTemplate, renderElement, RenderPosition} from './utils';

import TripInfoView from './view/trip-info.js';
import TripPriceInfoView from './view/trip-price.js';
import SiteMenuView from './view/site-menu.js';
import FilterView from './view/filter.js';
import SortView from './view/sort.js';
import {createPointListTemplate} from './view/point-list.js';
import {createAddAndEditPointTemplate} from './view/point-create-and-edit.js';
import {createPointItemTemplate} from './view/point-item.js';

import {generatePoint} from './mock/point';

const POINT_COUNT = 15;

const points = Array.from({ length: POINT_COUNT }, (item, index) => generatePoint(index));
const otherPoints = points.slice(1);

const sitePageHeaderElement = document.querySelector('.page-header');
const sitePageMainElement = document.querySelector('.page-main');

// Хэдер
// Отрисовывает информацию о поездке (маршрут и дата)
const tripMainElement = sitePageHeaderElement.querySelector('.trip-main');
renderElement(tripMainElement, new TripInfoView().getElement(), RenderPosition.AFTERBEGIN);

// Отрисовывает информацию о поездке (стоимость поездки)
const tripInfoElement = sitePageHeaderElement.querySelector('.trip-info');
renderElement(tripInfoElement, new TripPriceInfoView().getElement(), RenderPosition.BEFOREEND);

// Отрисовывает меню
const tripControlsNavigationElement = sitePageHeaderElement.querySelector('.trip-controls__navigation');
renderElement(tripControlsNavigationElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);

// Отрисовывает фильтр
const tripControlsFiltersElement = sitePageHeaderElement.querySelector('.trip-controls__filters');
renderElement(tripControlsFiltersElement, new FilterView().getElement(), RenderPosition.BEFOREEND);

// Основная часть
const tripEventsElement = sitePageMainElement.querySelector('.trip-events');

// Отрисовывает сортировку
renderElement(tripEventsElement, new SortView().getElement(), RenderPosition.BEFOREEND);

// Отрисовывает список точек маршрута
renderTemplate(tripEventsElement, createPointListTemplate());

const tripEventsListElement = sitePageMainElement.querySelector('.trip-events__list');

// Отрисовывает точку маршрута (в списке)
for (let i = 0; i < otherPoints.length; i++) {
  renderTemplate(tripEventsListElement, createPointItemTemplate(otherPoints[i]));
}

// Отрисовывает форму создания точки маршрута
renderTemplate(tripEventsListElement, createAddAndEditPointTemplate(otherPoints[otherPoints.length - 1], 1));

// Отрисовывает форму редактирования точки маршрута
renderTemplate(tripEventsListElement, createAddAndEditPointTemplate(points[0], 0), 'afterbegin');


