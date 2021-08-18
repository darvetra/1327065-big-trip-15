import {render, RenderPosition, createTripInfo} from './utils';

import TripInfoView from './view/trip-info.js';
import TripPriceView from './view/trip-price.js';
import SiteMenuView from './view/site-menu.js';
import FilterView from './view/filter.js';
import NoPointView from './view/no-point.js';
import SortView from './view/sort.js';
import PointListView from './view/point-list.js';
import PointAddAndEditView from './view/point-create-and-edit.js';
import PointView from './view/point.js';

import {generatePoint} from './mock/point';

const POINT_COUNT = 15;

const points = Array.from({ length: POINT_COUNT }, (item, index) => generatePoint(index));

const sitePageHeaderElement = document.querySelector('.page-header');
const sitePageMainElement = document.querySelector('.page-main');

/**
 * Отрисовывает точку маршрута и форму редактирования точки маршрута
 * А также приводит их в действие
 *
 * @param pointListElement
 * @param point
 */
const renderPoint = (pointListElement, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new PointAddAndEditView(point, 0);

  const replaceCardToForm = () => {
    pointListElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToCard = () => {
    pointListElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setFormRollupHandler(() => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(pointListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

/**
 * Отрисовывает блок с точками маршрута
 *
 * @param container - куда отрисовыаем
 * @param items - что отрисовываем
 */
const renderContentBlock = (container, items) => {

  const tripEventsElement = sitePageMainElement.querySelector('.trip-events');

  if (items.length === 0) {
    render(tripEventsElement, new NoPointView().getElement(), RenderPosition.BEFOREEND);
  } else {

    // Отрисовывает сортировку
    render(tripEventsElement, new SortView().getElement(), RenderPosition.BEFOREEND);

    // Отрисовывает список точек маршрута
    render(tripEventsElement, new PointListView().getElement(), RenderPosition.BEFOREEND);

    const tripEventsListElement = sitePageMainElement.querySelector('.trip-events__list');

    // Отрисовывает точку маршрута
    items.forEach((point) => {
      renderPoint(tripEventsListElement, point);
    });

    // Отрисовывает форму создания точки маршрута
    render(tripEventsListElement, new PointAddAndEditView(items[items.length - 1], 1).getElement(), RenderPosition.BEFOREEND);
  }
};

// Хэдер
// Отрисовывает информацию о поездке (маршрут и дата)
const tripMainElement = sitePageHeaderElement.querySelector('.trip-main');
render(tripMainElement, new TripInfoView(createTripInfo(points)).getElement(), RenderPosition.AFTERBEGIN);

// Отрисовывает информацию о поездке (стоимость поездки)
// По условию ТЗ в сумму должны также попадать доп.расходы, пофикси это в будущем, когда поймешь как это сделать ;)
const totalPrice = Object.keys(points).reduce((total, key) => total + points[key].basePrice, 0);

const tripInfoElement = sitePageHeaderElement.querySelector('.trip-info');
render(tripInfoElement, new TripPriceView(totalPrice).getElement(), RenderPosition.BEFOREEND);

// Отрисовывает меню
const tripControlsNavigationElement = sitePageHeaderElement.querySelector('.trip-controls__navigation');
render(tripControlsNavigationElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);

// Отрисовывает фильтр
const tripControlsFiltersElement = sitePageHeaderElement.querySelector('.trip-controls__filters');
render(tripControlsFiltersElement, new FilterView().getElement(), RenderPosition.BEFOREEND);

// Основная часть
renderContentBlock(sitePageMainElement, points);

