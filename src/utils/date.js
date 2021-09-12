import moment from 'moment';
import 'moment/min/locales.min';

// Set language to Indonesia
moment.locale('id');

export const getListOfMonths = () => {
  return new Promise((resolve, reject) => {
    try {
      const months = moment.months();

      const data = months.map((item, index) => {
        return ({
          name: item,
          id: index + 1,
        });
      });
      const listOfMonthsObj = {
        response: {
          data: {
            data,
          },
        },
      };
      resolve(listOfMonthsObj);
    } catch (err) {
      reject(new Error({
        message: 'Failed to get list of months',
      }));
    }
  });
};

export const getListOfYears = () => {
  return new Promise((resolve, reject) => {
    try {
      const currentYear = parseInt(new Date().getFullYear());
      const backward = 10;
      const data = Array.from({ length: backward }, (val, i) => {
        return ({
          id: currentYear - backward + i + 1,
          name: currentYear - backward + i + 1,
        });
      });
      const listOfYearsObj = {
        response: {
          data: {
            data,
          },
        },
      };
      resolve(listOfYearsObj);
    } catch (err) {
      reject(new Error({
        message: 'Failed to get list of years',
      }));
    }
  });
};
