/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable react/jsx-no-undef */
// Import Library
import React from 'react';
import { Grid, Popper, ClickAwayListener, Paper } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { ArrowForwardIos } from '@material-ui/icons';

// Import actions
import { setTab } from '../../actions';

function PopMenu(props) {
  const {
    tabId,
    anchorEl,
    items,
    handleClose,
    childAnchor,
    gChildAnchor,
    handleChild,
    handleGChild,
  } = props;
  const open = Boolean(anchorEl);
  const id = open ? `simple-popover-tab-${tabId}` : undefined;
  const dispatch = useDispatch();

  const handleRoute = (routeCallBack) => {
    dispatch(setTab(tabId));
    handleClose();
    routeCallBack();
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom">
        <Paper elevation={2} className="navbar-list-item-sub">
          {items.map((item) => {
            const showChild = childAnchor?.textContent === item.name;
            if (item.sub) {
              return (
                <Grid
                  className="navbar-list-item-sub-item"
                  item
                  key={item.id}
                  onClick={handleChild}
                >
                  <Grid
                    container
                    alignContent="space-between"
                  >
                    {item.name}
                    {showChild && <ArrowForwardIos />}
                  </Grid>
                  {showChild && (
                    <Popper
                      id={`child-${id}`}
                      open={Boolean(childAnchor)}
                      anchorEl={childAnchor}
                      placement="right-start"
                    >
                      <Paper elevation={2} className="navbar-list-item-sub">
                        {item.sub.map((child) => {
                          const showGChild = gChildAnchor?.textContent == child.name;
                          if (child.sub) {
                            return (
                              <Grid
                                className="navbar-list-item-sub-item"
                                item
                                key={child.id}
                                onClick={handleGChild}
                              >
                                <Grid
                                  container
                                  alignContent="space-between"
                                  onClick={handleGChild}
                                >
                                  {child.name}
                                  {showGChild && <ArrowForwardIos />}
                                </Grid>
                                {showGChild && (
                                  <Popper
                                    id={`grandchild-${id}`}
                                    open={Boolean(gChildAnchor)}
                                    anchorEl={gChildAnchor}
                                    placement="right-start"
                                  >
                                    <Paper
                                      elevation={2}
                                      className="navbar-list-item-sub"
                                    >
                                      {child.sub.map((gchild) => (
                                        <Grid
                                          className="navbar-list-item-sub-item"
                                          item
                                          key={gchild.id}
                                          onClick={() =>
                                            handleRoute(
                                                gchild.onClick,
                                            )
                                          }
                                        >
                                          <Grid
                                            container
                                            alignContent="space-between"
                                          >
                                            {gchild.name}
                                          </Grid>
                                        </Grid>
                                      ))}
                                    </Paper>
                                  </Popper>
                                )}
                              </Grid>
                            );
                          } else {
                            return (
                              <Grid
                                className="navbar-list-item-sub-item"
                                item
                                key={child.id}
                                onClick={() =>
                                  handleRoute(child.onClick)
                                }
                              >
                                <Grid container alignContent="space-between">
                                  {child.name}
                                </Grid>
                              </Grid>
                            );
                          }
                        })}
                      </Paper>
                    </Popper>
                  )}
                </Grid>
              );
            } else {
              return (
                <Grid
                  className="navbar-list-item-sub-item"
                  item
                  key={item.id}
                  onClick={() => handleRoute(item.onClick)}
                >
                  <Grid container alignContent="space-between">
                    {item.name}
                  </Grid>
                </Grid>
              );
            }
          })}
        </Paper>
      </Popper>
    </ClickAwayListener>
  );
}

PopMenu.propTypes = {
  tabId: PropTypes.number.isRequired,
  anchorEl: PropTypes.any,
  items: PropTypes.array.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleChild: PropTypes.func.isRequired,
  handleGChild: PropTypes.func.isRequired,
  childAnchor: PropTypes.any,
  gChildAnchor: PropTypes.any,
};

export default PopMenu;
