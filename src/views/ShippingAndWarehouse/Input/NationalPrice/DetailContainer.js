import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const DetailContainer = ({ data }) => {
  return (
    <Grid item container className="container-detail">
      <h4>Description</h4>
      <Grid item container className="container-detail-section" direction="column">
        <h4>Production</h4>
        {data.data.length ? (
          <Grid item container>
            <Grid item container md={6} justify="space-between" className="container-detail-desc">
              <Grid item container xs={6}>
                Total weight
              </Grid>
              <Grid item container xs={6}>
                {`: ${data.data.length ? data.data[0].total : 0} kg`}
              </Grid>
            </Grid>
            <Grid item container md={6} justify="space-between" className="container-detail-desc">
              <Grid item container xs={6}>
                Container worth
              </Grid>
              <Grid item container xs={6}>
                {`: ${data.container_worth} kg`}
              </Grid>
            </Grid>
            <Grid item container md={6} justify="space-between" className="container-detail-desc">
              <Grid item container xs={6}>
                Charcoal price (kg)
              </Grid>
              <Grid item container xs={6}>
                {`: Rp${data.charcoal_price || 0}`}
              </Grid>
            </Grid>
            <Grid item container md={6} justify="space-between" className="container-detail-desc">
              <Grid item container xs={6}>
                Charcoal brand
              </Grid>
              <Grid item container xs={6}>
                {`: ${data.data.length ? data.data[0].name : ''}`}
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <div>No Data</div>
        )}
      </Grid>
      <Grid item container className="container-detail-section">
        <h4 className="container-detail-subtitle">Shipping Fee</h4>
        <Grid item container direction="column">
          <Grid item container md={6} justify="space-between" className="container-detail-desc">
            {data.shipping_fee.length > 0 ? data.shipping_fee.map((item) => (
              <>
                <Grid item container xs={6}>
                  {item.nama_pembayaran}
                </Grid>
                <Grid item container xs={6}>
                  {`: Rp${item.harga}`}
                </Grid>
              </>
            )) : (
              <div>No Data</div>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item container className="container-detail-section">
        <h4 className="container-detail-subtitle">Warehouse Fee</h4>
        <Grid item container direction="column">
          <Grid item container md={6} justify="space-between" className="container-detail-desc">
            {data.warehouse_fee.length > 0 ? data.warehouse_fee.map((item) => (
              <>
                <>
                  <Grid item container xs={6}>
                    {item.nama_pembayaran}
                  </Grid>
                  <Grid item container xs={6}>
                    {`: Rp${item.harga}`}
                  </Grid>
                </>
              </>
            )) : (
              <div>No Data</div>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

DetailContainer.defaultProps = {
  data: {
    charcoal_price: 0,
    container_worth: 0,
    data: [],
    shipping_fee: [],
    total_weight: 0,
    warehouse_fee: [],
  },
};

DetailContainer.propTypes = {
  data: PropTypes.shape({
    charcoal_price: PropTypes.number,
    container_worth: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.shape()),
    shipping_fee: PropTypes.array,
    total_weight: PropTypes.number,
    warehouse_fee: PropTypes.array,
  }),
};

export default DetailContainer;
