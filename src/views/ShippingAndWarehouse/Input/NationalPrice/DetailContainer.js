import React from 'react';
import { Grid } from '@material-ui/core';

const DetailContainer = () => {
  return (
    <Grid item container className="container-detail">
      <h4>Description</h4>
      <Grid item container className="container-detail-section">
        <h4>Production</h4>
        <Grid item container>
          <Grid item container md={6} justify="space-between" className="container-detail-desc">
            <Grid item container xs={6}>
              Total weight
            </Grid>
            <Grid item container xs={6}>
              : 0 kg
            </Grid>
          </Grid>
          <Grid item container md={6} justify="space-between" className="container-detail-desc">
            <Grid item container xs={6}>
              Container worth
            </Grid>
            <Grid item container xs={6}>
              : 0 kg
            </Grid>
          </Grid>
          <Grid item container md={6} justify="space-between" className="container-detail-desc">
            <Grid item container xs={6}>
              Charcoal price (kg)
            </Grid>
            <Grid item container xs={6}>
              : Rp10.000
            </Grid>
          </Grid>
          <Grid item container md={6} justify="space-between" className="container-detail-desc">
            <Grid item container xs={6}>
              Charcoal brand
            </Grid>
            <Grid item container xs={6}>
              : Rose brand
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container className="container-detail-section">
        <h4 className="container-detail-subtitle">Shipping Fee</h4>
        <Grid item container direction="column">
          <Grid item container md={6} justify="space-between" className="container-detail-desc">
            <Grid item container xs={6}>
              Shipping Fee A
            </Grid>
            <Grid item container xs={6}>
              : 0 kg
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container className="container-detail-section">
        <h4 className="container-detail-subtitle">Warehouse Fee</h4>
        <Grid item container direction="column">
          <Grid item container md={6} justify="space-between" className="container-detail-desc">
            <Grid item container xs={6}>
              Warehouse Fee A
            </Grid>
            <Grid item container xs={6}>
              : 0 kg
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DetailContainer;
