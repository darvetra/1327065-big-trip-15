import {createTripInfoTemplate} from './view/trip-info.js';
import {createTripPriceInfoTemplate} from './view/trip-price.js';
import {createSiteMenuTemplate} from './view/site-menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortTemplate} from './view/sort.js';
import {createPointListTemplate} from './view/point-list.js';
import {createAddPointTemplate} from './view/point-add.js';
import {createEditPointTemplate} from './view/point-edit.js';
import {createPointItemTemplate} from './view/point-item.js';

import {generatePoint} from './mock/point';


const POINT_COUNT = 15;

const points = new Array(POINT_COUNT).fill().map((item, index) => generatePoint(index + 1));

// eslint-disable-next-line no-console
console.log(points);

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const sitePageHeaderElement = document.querySelector('.page-header');
const sitePageMainElement = document.querySelector('.page-main');

// Хэдер
// Отрисовывает информацию о поездке (маршрут и дата)
const tripMainElement = sitePageHeaderElement.querySelector('.trip-main');
render(tripMainElement, createTripInfoTemplate(), 'afterbegin');

// Отрисовывает информацию о поездке (стоимость поездки)
const tripInfoElement = sitePageHeaderElement.querySelector('.trip-info');
render(tripInfoElement, createTripPriceInfoTemplate());

// Отрисовывает меню
const tripControlsNavigationElement = sitePageHeaderElement.querySelector('.trip-controls__navigation');
render(tripControlsNavigationElement, createSiteMenuTemplate());

// Отрисовывает фильтр
const tripControlsFiltersElement = sitePageHeaderElement.querySelector('.trip-controls__filters');
render(tripControlsFiltersElement, createFilterTemplate());

// Основная часть
const tripEventsElement = sitePageMainElement.querySelector('.trip-events');

// Отрисовывает сортировку
render(tripEventsElement, createSortTemplate());

// Отрисовывает список точек маршрута
render(tripEventsElement, createPointListTemplate());

const tripEventsListElement = sitePageMainElement.querySelector('.trip-events__list');

// Отрисовывает точку маршрута (в списке)
for (let i = 0; i < POINT_COUNT; i++) {
  render(tripEventsListElement, createPointItemTemplate(points[i]));
}

// Отрисовывает форму создания точки маршрута
render(tripEventsListElement, createAddPointTemplate(points[14]));

// Отрисовывает форму редактирования точки маршрута
render(tripEventsListElement, createEditPointTemplate(points[0]), 'afterbegin');


