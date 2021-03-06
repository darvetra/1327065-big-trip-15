import {FilterType} from '../const';

import dayjs from 'dayjs';

import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter);

const now = dayjs();

const isFuture = (pointDate) => {
  const date = dayjs(pointDate.dateFrom);
  return date.isSameOrAfter(now);
};

const isPast = (pointDate) => {
  const date = dayjs(pointDate.dateTo);
  return date.isBefore(now);
};

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuture(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPast(point)),
};
