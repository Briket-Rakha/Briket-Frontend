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
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();

  const handleRoute = (route) => {
    dispatch(setTab(tabId));
    handleClose();
    history.push(route);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom">
        <Paper elevation={2} className="navbar-list-item-sub">
          {items.map((item, idx) => {
            const showChild = childAnchor?.textContent === item.name;
            if (item.sub?.length) {
              return (
                <Grid
                  className="navbar-list-item-sub-item"
                  item
                  id={`child-${idx}`}
                  key={idx}
                  onMouseEnter={handleChild}
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
                                id={`child-item-${id}`}
                                onMouseEnter={handleGChild}
                              >
                                <Grid
                                  container
                                  alignContent="space-between"
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
                                          id={`grandchild-item-${id}`}
                                          onClick={() =>
                                            handleRoute(
                                                gchild.route,
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
                                onMouseEnter={handleGChild}
                                onClick={() =>
                                  handleRoute(child.route)
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
                  onMouseEnter={handleChild}
                  key={item.id}
                  onClick={() => handleRoute(item.route)}
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
