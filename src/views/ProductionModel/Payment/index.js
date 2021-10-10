// Import Library
import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

// Import Component
import CustomAlert from '../../../components/Alert';
import CustomSelect from '../../../components/Select';

// Import utils
// eslint-disable-next-line no-unused-vars
import { getListOfMonths, getListOfYears } from '../../../utils/date';

// Import API
import {
  apiGetPaymentByFilter,
  apiGetPaymentTimeline,
} from '../../../api/payment.api';
import { apiGetOutsourceMaterial } from '../../../api/supplier.api';

// Import Styling
import '../../../styles/views/payment-timeline.scss';

// Import Views
import OutSouceMaterial from './OutSouceMaterial';
import CustomTable from '../../../components/Table';

// Import constat
import { statusList } from '../../../constants/transactionStatus';

const PaymentTimeline = () => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [status, setStatus] = useState('');
  const [payment, setPayment] = useState('');
  const [outsource, setOutsource] = useState([]);
  const [timeline, setTimeline] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  const fetchOutsourceMaterial = async (paymentId) => {
    await apiGetOutsourceMaterial(paymentId)
        .then((i) => {
          const { response: { data } } = i;
          setOutsource(data.data);
        })
        .catch((err) => {
          setErrorMessage(
              err?.message ||
            'Failed to get data',
          );
        });
  };

  const fetchPaymentTimeline = async (paymentId) => {
    await apiGetPaymentTimeline(paymentId)
        .then((i) => {
          const { response: { data } } = i;
          setTimeline(data.result);
        })
        .catch((err) => {
          setErrorMessage(
              err?.message ||
            'Failed to get data',
          );
        });
  };


  useEffect(() => {
    if (payment) {
      fetchOutsourceMaterial(payment);
      fetchPaymentTimeline(payment);
    }
  }, [payment]);

  return (
    <Grid item container className="payment-timeline" direction="column">
      {Boolean(errorMessage) && (
        <CustomAlert
          type={'error'}
          message={errorMessage}
          onClose={() => setErrorMessage('')}
        />
      )}
      <Grid item container className="payment-timeline-header">
        <Grid
          item
          container
          className="payment-timeline-header-title"
          direction="column"
        >
          <h3>Payment Timeline</h3>
        </Grid>
      </Grid>
      <Grid
        item
        container
        spacing={2}
        className="timeline-payment-input"
      >
        <Grid item xs={3}>
          <CustomSelect
            value={month}
            label="Month"
            getValues={getListOfMonths}
            setValue={setMonth}
            size="medium"
          />
        </Grid>
        <Grid item xs={3}>
          <CustomSelect
            value={year}
            label="Year"
            getValues={getListOfYears}
            setValue={setYear}
            size="medium"
          />
        </Grid>
        <Grid item xs={3}>
          <CustomSelect
            value={status}
            label="Status"
            getValues={statusList}
            setValue={setStatus}
            size="medium"
            constantValues
          />
        </Grid>
        <Grid item xs={3}>
          <CustomSelect
            value={payment}
            label="Transaction"
            getValues={month && year ? (() => apiGetPaymentByFilter(month, year, status)) : null}
            setValue={setPayment}
            size="medium"
            disabled={Boolean(!month)}
            haveParent
            parentValue={[month, year, status]}
          />
        </Grid>
      </Grid>
      <Grid item container className="payment-timeline-body">
        {outsource?.timeline?.length ? (
          <Grid item md={12}>
            <OutSouceMaterial data={outsource} />
          </Grid>
          ) : (
            <Grid item container md={12}>
              <h3 className="no-data">
              No Data Found!
              </h3>
            </Grid>
          )
        }
        {timeline?.length ? (
          <CustomTable
            header={['Date', 'Payment', 'Description']}
            content={timeline}
            alignHead="left"
            alignBody="left"
            keys={[
              { type: 'date', value: 'date' },
              { type: 'number', value: 'payment_amount' },
              { type: 'string', value: 'description' },
            ]}
          />
        ) : (
          <Grid item container md={12}>
            <h3 className="no-data">
            No Data Found!
            </h3>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default PaymentTimeline;
