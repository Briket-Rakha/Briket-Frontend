// Import Library
import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

// Import Utils
import { formatCurrency } from '../../../utils/helper';

const OutSouceMaterial = ({ data }) => {
  return (
    <Grid item container spacing={2} className="outsource-material-container">
      <Grid item md={6}>
        <table className="outsource-material-item">
          <tbody>
            <tr>
              <td>Complete Payment</td>
              <td>:</td>
              <td>{formatCurrency(data.timeline[0].complete_price, 'IDR')}</td>
            </tr>
            <tr>
              <td>Commission Price</td>
              <td>:</td>
              <td>{formatCurrency(data.timeline[0].commision_price, 'IDR')}</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>Description</td>
            </tr>
            <tr>
              <td><li>Brand</li></td>
              <td>:</td>
              <td>{data.timeline[0].charcoal_brand_name}</td>
            </tr>
            <tr>
              <td><li>Amount (kg)</li></td>
              <td>:</td>
              <td>{`${data.timeline[0].amount} kg`}</td>
            </tr>
            <tr>
              <td><li>Outsource Name</li></td>
              <td>:</td>
              <td>{data.timeline[0].outsource_name}</td>
            </tr>
          </tbody>
        </table>
      </Grid>
      <Grid item md={6}>
        <table className="outsource-material-item">
          <tbody>
            <tr>
              <td>Remaining Payment</td>
              <td>:</td>
              <td>
                {
                  data.payment === 0 ?
                    'LUNAS' :
                    formatCurrency(data.payment_remaining ?? 0, 'IDR')
                }
              </td>
            </tr>
          </tbody>
        </table>
      </Grid>
    </Grid>
  );
};

OutSouceMaterial.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default OutSouceMaterial;
