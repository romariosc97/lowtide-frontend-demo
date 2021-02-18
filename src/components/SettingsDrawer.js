import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import SettingsIcon from '@material-ui/icons/Settings';
import { Radio } from '@material-ui/core';
import { GlobalContext } from '../context/GlobalContext';
import './Settings.scss';
import useDeployCards from '../hooks/useDeployCards';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  settingsDrawer: {
    outline: 'inherit',
    border: 'none',
    cursor: 'pointer',
    width: '2rem',
    height: '2rem',
    borderRadius: '50%',
    padding: 4,
    backgroundColor: '#005FB2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: ' #F6F6F6',
  },
});

const SettingsDrawer = ({ position }) => {
  const { setBranch, branch, setAvailableTemplates } = useContext(GlobalContext);
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };

  const handleChange = (event) => {
    setAvailableTemplates([]);
    setBranch(event.target.value);
    console.log(open);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        ["settings"]: true
      })}
      role="presentation"
      //onClick={toggleDrawer(anchor, false)}
      //onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="settings__title">Settings</div>
      <div className="settings__content">
        <div className="settings__content__subtitle">Deploy</div>
        <div className="settings__content__name">Select your branch:</div>
        <Radio
          checked={branch === 'beta'}
          onChange={handleChange}
          value="beta"
          name="branch"
          color="primary"
          inputProps={{ 'aria-label': 'Beta' }}
        /> Beta
        <br/>
        <Radio
          checked={branch === 'master'}
          onChange={handleChange}
          value="master"
          name="branch"
          color="primary"
          inputProps={{ 'aria-label': 'Master' }}
        /> Master
        <br/>
      </div>
    </div>
  );

  return (
    <div>
      <button className={classes.settingsDrawer} onClick={toggleDrawer(true)}>
        <SettingsIcon />
      </button>
      <Drawer anchor={position} open={open} onClose={toggleDrawer(false)}>
        {list(position)}
      </Drawer>
    </div>
  );
};

export default SettingsDrawer;
