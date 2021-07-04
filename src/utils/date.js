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
          id: index,
        });
      });
      console.log(data);
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
