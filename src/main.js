import {createTripInfoTemplate} from './view/trip-info.js';
import {createTripPriceInfoTemplate} from './view/trip-price.js';
import {createSiteMenuTemplate} from './view/site-menu.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const sitePageHeaderElement = document.querySelector('.page-header');

// Отрисовывает информацию о поездке (маршрут и дата)
const tripMainElement = sitePageHeaderElement.querySelector('.trip-main');
render(tripMainElement, createTripInfoTemplate(), 'afterbegin');

// Отрисовывает информацию о поездке (стоимость поездки)
const tripInfoElement = sitePageHeaderElement.querySelector('.trip-info');
render(tripInfoElement, createTripPriceInfoTemplate(), 'beforeend');

// Отрисовывает меню
const siteMenuElement = sitePageHeaderElement.querySelector('.trip-controls__navigation');
render(siteMenuElement, createSiteMenuTemplate(), 'beforeend');
