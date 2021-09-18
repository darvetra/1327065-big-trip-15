
export const statCostsByPointType = (type, events) =>
  events
    .filter((point) => point.type === type)
    .reduce((total, point) => total + point.basePrice, 0);

export const statEventsCountByPointType = (type, events) =>
  events
    .filter((point) => point.type === type).length;
