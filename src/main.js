import {createSiteMenuTemplate} from './view/site-menu.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const sitePageHeaderElement = document.querySelector('.page-header');
const siteMenuElement = sitePageHeaderElement.querySelector('.trip-controls__navigation');

render(siteMenuElement, createSiteMenuTemplate(), 'beforeend');
