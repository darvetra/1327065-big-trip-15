import dayjs from 'dayjs';

import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter);

const now = dayjs();


const isFuture = (pointDate) => {
  pointDate.isSameOrAfter(now);
};

const isPast = (pointDate) => {
  pointDate.isBefore(now);
};

/*eslint-disable no-unused-vars*/
const pointToFilterMap = {
  everything: (points) => points.filter((point) => point),
  future: (points) => points.filter((point) => isFuture(point)),
  past: (points) => points.filter((point) => isPast(point)),
};
