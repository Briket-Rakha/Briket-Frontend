/* eslint-disable no-unused-vars */
// Import Library
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import PropTypes from 'prop-types';

// Import Utils
import { toSortedArray } from '../../utils/helper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const CustomTable = (props) => {
  const classes = useStyles();

  const { header, alignHead, alignBody, content, keys } = props;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {header.map((item, index) => (
              <TableCell
                key={index}
                align={alignHead}
                className="table-head"
              >
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {content.map((row, index) => (
            <TableRow key={index}>
              {toSortedArray(row, keys).map((item, idx) => (
                <TableCell key={idx} align={alignBody}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

CustomTable.defaultProps = {
  alignHead: 'center',
  alignBody: 'center',
  header: [],
  content: [],
};

CustomTable.propTypes = {
  alignHead: PropTypes.oneOf(
      ['center', 'justify', 'left', 'right'],
  ),
  alignBody: PropTypes.oneOf(
      ['center', 'justify', 'left', 'right'],
  ),
  header: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  content: PropTypes.arrayOf(PropTypes.shape()),
  keys: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
};

export default CustomTable;
