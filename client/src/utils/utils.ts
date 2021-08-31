import moment from 'moment';

export const getDateOnly = (date: Date, format: string): string => {
  return moment(date).format(format);
};

export const generateNextDays = (
  date: Date,
  format: string,
  cant = 10
): Array<string> => {
  let dateCounter = date;
  const listDay = [getDateOnly(dateCounter, format)];
  for (let i = 1; i < cant; i++) {
    dateCounter = moment(dateCounter).add(1, 'days').toDate();
    listDay.push(getDateOnly(dateCounter, format));
  }
  return listDay;
};

export const mode = (arr: Array<any>) => {
  return arr
    .sort(
      (a, b) =>
        arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
    )
    .pop();
};

export const filterListForAttribute = (
  list: Array<any>,
  attr: string
): Array<any> => list.map((l) => l[attr]);
