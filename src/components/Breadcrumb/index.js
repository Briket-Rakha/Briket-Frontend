/* eslint-disable require-jsdoc */
// Import Library
import React from 'react';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PropTypes from 'prop-types';

// Import styling
import '../../styles/components/breadcrumbs.scss';

export default function CustomBreadcrumbs(props) {
  const { componentTree } = props;

  return (
    <Breadcrumbs
      className="custom-breadcrumbs"
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {componentTree.map(({ name, onClick }, index) => {
        if (onClick) {
          return (
            <Link
              color="inherit"
              onClick={onClick}
              className="custom-breadcrumbs-item is-link"
            >
              {name}
            </Link>
          );
        }
        return (
          <Typography
            key={index}
            color="textPrimary"
            className="custom-breadcrumbs-item"
          >
            {name}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
}

CustomBreadcrumbs.defaultProps = {
  componentTree: [],
};

CustomBreadcrumbs.propTypes = {
  componentTree: PropTypes.arrayOf(PropTypes.object),
};
