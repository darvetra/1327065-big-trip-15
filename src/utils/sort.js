import dayjs from 'dayjs';
import {calculateMinuteDiff} from './date.js';

export const sortByDate = (pointA, pointB) => dayjs(pointB.dueDate).diff(dayjs(pointA.dueDate));

export const sortByTime = (pointA, pointB) => calculateMinuteDiff(pointA, pointB);

export const sortByPrice = (pointA, pointB) => {
  if (pointA > pointB) {
    return pointA;
  }

  return pointB;
};
