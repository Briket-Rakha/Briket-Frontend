/* eslint-disable require-jsdoc */
// Import Library
import React from 'react';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

// Import styling
import '../../styles/components/breadcrumbs.scss';

export default function CustomBreadcrumbs(props) {
  // Init history object
  const history = useHistory();

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
              key={index}
              color="inherit"
              onClick={() => history.push(onClick)}
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
