
export const statCostsByPointType = (type, events) =>
  events
    .filter((point) => point.type === type)
    .reduce((total, point) => total + point.basePrice, 0);

export const statEventsCountByPointType = (type, events) =>
  events
    .filter((point) => point.type === type).length;

export const sortEventTypesByData = (eventTypes, sumCostsByType) => {
  const dataTypesCost = eventTypes.map((element, i) => ({
    costType: element,
    sum: sumCostsByType[i],
  }));
  return dataTypesCost.sort((costTypeDataA, costTypeDataB) => costTypeDataB.sum - costTypeDataA.sum);
};
