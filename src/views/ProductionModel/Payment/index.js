// Import Library
import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

// Import Component
import CustomAlert from '../../../components/Alert';
import CustomSelect from '../../../components/Select';

// Import utils
import { getListOfMonths } from '../../../utils/date';

// Import API
import {
  apiGetPaymentByMonth,
  apiGetPaymentTimeline,
} from '../../../api/payment.api';
import { apiGetOutsourceMaterial } from '../../../api/supplier.api';

// Import Styling
import '../../../styles/views/payment-timeline.scss';

// Import Views
import OutSouceMaterial from './OutSouceMaterial';
import CustomTable from '../../../components/Table';

const PaymentTimeline = () => {
  const [month, setMonth] = useState('');
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
            'Gagal mengambil data outsource material',
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
            'Gagal mengambil data payment timeline',
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
        <Grid item xs={6}>
          <CustomSelect
            value={month}
            label="Bulan"
            getValues={getListOfMonths}
            setValue={setMonth}
            size="medium"
          />
        </Grid>
        <Grid item xs={6}>
          <CustomSelect
            value={payment}
            label="Transaction"
            getValues={month ? (() => apiGetPaymentByMonth(month)) : null}
            setValue={setPayment}
            size="medium"
            disabled={Boolean(!month)}
            haveParent
            parentValue={month}
          />
        </Grid>
      </Grid>
      <Grid item container className="payment-timeline-body">
        {outsource.length ?
          outsource.map((item, index) => (
            <Grid item md={12} key={index}>
              <OutSouceMaterial data={item} />
            </Grid>
          )) : (
            <Grid item md={12}>
              <h3 className="no-data">
              Tidak ada data pembayaran outsource material
              </h3>
            </Grid>
          )
        }
        {timeline?.length ? (
          <CustomTable
            header={['Tanggal', 'Pembayaran', 'Deskripsi']}
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
          <Grid item md={12}>
            <h3 className="no-data">
              Tidak ada data timeline pembayaran
            </h3>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default PaymentTimeline;
