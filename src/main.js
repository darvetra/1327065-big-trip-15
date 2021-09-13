import {DESTINATION_CITIES, pointCount} from './const.js';
import {render, RenderPosition} from './utils/render.js';
import {createTripInfo} from './utils/date.js';

import {generateDestination, generatePoint} from './mock/point.js';
import TripModel from './model/trip.js';
import FilterModel from './model/filter.js';

import TripInfoView from './view/trip-info.js';
import TripPriceView from './view/trip-price.js';
import SiteMenuView from './view/site-menu.js';
import FilterView from './view/filter.js';

import TripPresenter from './presenter/trip.js';

const destinationCities = DESTINATION_CITIES.map((item) => generateDestination(item));
const points = Array.from({ length: pointCount }, () => generatePoint(destinationCities));

const tripModel = new TripModel();
tripModel.setPoints(points, destinationCities);

const filterModel = new FilterModel();

const sitePageHeaderElement = document.querySelector('.page-header');
const sitePageMainElement = document.querySelector('.page-main');
const siteBodyContainerElement = sitePageMainElement.querySelector('.page-body__container');

const tripPresenter = new TripPresenter(siteBodyContainerElement, tripModel);

// Хэдер
// Отрисовывает информацию о поездке (маршрут и дата)
const tripMainElement = sitePageHeaderElement.querySelector('.trip-main');
render(tripMainElement, new TripInfoView(createTripInfo(points)), RenderPosition.AFTERBEGIN);

// Отрисовывает информацию о поездке (стоимость поездки)
// По условию ТЗ в сумму должны также попадать доп.расходы, пофикси это в будущем, когда поймешь как это сделать ;)
const totalPrice = Object.keys(points).reduce((total, key) => total + points[key].basePrice, 0);

const tripInfoElement = sitePageHeaderElement.querySelector('.trip-info');
render(tripInfoElement, new TripPriceView(totalPrice), RenderPosition.BEFOREEND);

// Отрисовывает меню
const tripControlsNavigationElement = sitePageHeaderElement.querySelector('.trip-controls__navigation');
render(tripControlsNavigationElement, new SiteMenuView(), RenderPosition.BEFOREEND);

// Отрисовывает фильтр
const tripControlsFiltersElement = sitePageHeaderElement.querySelector('.trip-controls__filters');
render(tripControlsFiltersElement, new FilterView(), RenderPosition.BEFOREEND);

// Основная часть
tripPresenter.init();

