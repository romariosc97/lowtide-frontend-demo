import React, { useState, useEffect, useContext } from 'react';
import { Checkbox } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { GlobalContext } from '../context/GlobalContext';

const useCheckboxStyles = makeStyles({
  root: {
    padding: '0 0px 0 0',
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: 'white',
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  markedCheckbox: {
    backgroundColor: '#808080',
    '&:before': {
      display: 'block',
      width: 20,
      height: 20,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
  },
});

const CustomCheckbox = ({ selected, setParentSelected, template_key }) => {

  const classes = useCheckboxStyles();
  const { deploying, templatesDeployed } = useContext(GlobalContext);
  const [isSelected, setSelected] = useState(selected);
  const [isDisabled, setDisabled] = useState(false);
  useEffect(() => {
    if(deploying.indexOf(template_key)!==-1 && isDisabled===false){
      setSelected(false);
      setDisabled(true);
    }
  }, [deploying]);
  
  useEffect(() => {
    if(templatesDeployed.indexOf(template_key)!==-1){
      setSelected(false);
      setDisabled(false);
    }
  }, [templatesDeployed]);

  return (
    <Checkbox
      checked={isSelected}
      checkedIcon={
        <span className={clsx(classes.checkBox, classes.markedCheckbox)} />
      }
      icon={<span className={classes.checkBox} />}
      inputProps={{ 'aria-label': 'selection checkbox' }}
      disableRipple
      disabled={isDisabled}
      onClick={(e) => e.stopPropagation()}
      onChange={() => {
        setSelected(!isSelected);
        if (setParentSelected) setParentSelected(!isSelected);
      }}
      classes={{
        root: classes.root,
      }}
    />
  );
};

CustomCheckbox.defaultProps = {
  selected: false,
};

export default CustomCheckbox;
