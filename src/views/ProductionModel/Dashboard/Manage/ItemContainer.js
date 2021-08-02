// Import Modules
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, CircularProgress } from '@material-ui/core';
import { Delete, Add } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';

// Import styling
import '../../../../styles/components/item-container.scss';

const ItemContainer = (props) => {
  const {
    title,
    getItems,
    deleteItem,
    setOpenModal,
    handleError,
  } = props;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // changable data
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const handleChangePage = async (e, page) => {
    setPage(page);
  };

  const fetchItems = async () => {
    const params = {
      page,
      limit: limit,
    };

    setLoading(true);
    await getItems(params)
        .then((i) => {
          const { response: { data } } = i;
          setItems(data.data);
          setTotal(Math.ceil(data.total/limit));
          setLoading(false);
        })
        .catch((err) => {
          handleError(err);
          setLoading(false);
        });
  };

  useEffect(() => {
    fetchItems();
  }, [page]);

  return (
    <Grid item container className="item-container" direction="column">
      <Grid item className="item-container-title">
        {`Manage ${title}`}
      </Grid>
      <Grid item container justify="flex-end">
        <Button
          startIcon={<Add />}
          onClick={() => setOpenModal(true)}
          className="btn btn-md"
        >
          {`Add New ${title}`}
        </Button>
      </Grid>
      <Grid item container className="item-container-list" direction="column">
        {loading && !items.length && (
          <Grid container className="loading-container">
            <CircularProgress size={25} thickness={5} />
          </Grid>
        )}
        {!loading && !items.length && <Grid item container>No Data Available</Grid>}
        {!loading && items.length && items.map((item) => (
          <Grid
            item
            container
            key={item.id}
            className="item-container-item"
            wrap="nowrap"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              {item.name}
            </Grid>
            <Button
              startIcon={<Delete />}
              onClick={() => deleteItem(item.id)}
              className="btn btn-md delete-btn"
            >
              Delete
            </Button>
          </Grid>
        ))}
      </Grid>
      <Pagination
        page={page}
        defaultPage={1}
        count={total}
        shape="rounded"
        color="primary"
        size="large"
        onChange={handleChangePage}
      />
    </Grid>
  );
};

ItemContainer.defaultProps = {
  setOpenModal: () => {},
  handleError: () => {},
};

ItemContainer.propTypes = {
  title: PropTypes.string.isRequired,
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  addItems: PropTypes.func.isRequired,
  setOpenModal: PropTypes.func,
  handleError: PropTypes.func,
};

export default ItemContainer;
