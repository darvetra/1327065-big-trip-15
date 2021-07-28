import {createTripInfoTemplate} from './view/trip-info.js';
import {createSiteMenuTemplate} from './view/site-menu.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const sitePageHeaderElement = document.querySelector('.page-header');

// Отрисовывает информацию о поездке (маршрут, стоимость и дата)
const tripMainElement = sitePageHeaderElement.querySelector('.trip-main');
render(tripMainElement, createTripInfoTemplate(), 'afterbegin');

// Отрисовывает меню
const siteMenuElement = sitePageHeaderElement.querySelector('.trip-controls__navigation');
render(siteMenuElement, createSiteMenuTemplate(), 'beforeend');
