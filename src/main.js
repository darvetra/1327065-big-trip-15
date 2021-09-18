import {DESTINATION_CITIES, pointCount, MenuItem, UpdateType, FilterType} from './const.js';
import {render, RenderPosition} from './utils/render.js';
import {createTripInfo} from './utils/date.js';

import {generateDestination, generatePoint} from './mock/point.js';
import TripModel from './model/trip.js';
import FilterModel from './model/filter.js';

import TripInfoView from './view/trip-info.js';
import TripPriceView from './view/trip-price.js';
import SiteMenuView from './view/site-menu.js';
import StatsView from './view/stats.js';

import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';

const destinationCities = DESTINATION_CITIES.map((item) => generateDestination(item));
const points = Array.from({ length: pointCount }, () => generatePoint(destinationCities));

const tripModel = new TripModel();
tripModel.setPoints(points, destinationCities);

const filterModel = new FilterModel();

const sitePageHeaderElement = document.querySelector('.page-header');
const sitePageMainElement = document.querySelector('.page-main');
const siteBodyContainerElement = sitePageMainElement.querySelector('.page-body__container');

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
const siteMenuComponent = new SiteMenuView();
const tripControlsNavigationElement = sitePageHeaderElement.querySelector('.trip-controls__navigation');
render(tripControlsNavigationElement, siteMenuComponent, RenderPosition.BEFOREEND);

// Основная часть
const tripPresenter = new TripPresenter(siteBodyContainerElement, tripModel, filterModel);

// Отрисовывает фильтр
const tripControlsFiltersElement = sitePageHeaderElement.querySelector('.trip-controls__filters');
const filterPresenter = new FilterPresenter(tripControlsFiltersElement, filterModel, tripModel);

// Закрытие формы добавления точки маршрута
const handleTaskNewFormClose = () => {
  tripPresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  tripPresenter.init();

  document.querySelector('.trip-main__event-add-btn').disabled = false;
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
};

// Кнопка добавления точки маршрута
document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint(handleTaskNewFormClose);
  document.querySelector('.trip-main__event-add-btn').disabled = true;
});

// Выбор пунктов меню
let currentMenuItem = MenuItem.TABLE;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      if (currentMenuItem !== MenuItem.TABLE) {
        siteMenuComponent.setMenuItem(MenuItem.TABLE);
        tripPresenter.init();
        // Скрыть статистику

        currentMenuItem = MenuItem.TABLE;
      }
      break;
    case MenuItem.STATS:
      if (currentMenuItem !== MenuItem.STATS) {
        siteMenuComponent.setMenuItem(MenuItem.STATS);
        tripPresenter.destroy();
        // Показать статистику

        currentMenuItem = MenuItem.STATS;
      }
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

// Отрисовка блоков
filterPresenter.init();
// Для удобства отладки скроем доску
// tripPresenter.init();

// и отобразим сразу статистику
render(siteBodyContainerElement, new StatsView(tripModel.getPoints()), RenderPosition.BEFOREEND);

