import React, { useState, useEffect, useContext } from 'react';
import { Checkbox } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { GlobalContext } from '../context/GlobalContext';

const useCheckboxStyles = makeStyles({
  root: {
    padding: '0 12px 0 0',
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
    backgroundColor: '#27AE60',
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

const CustomCheckbox = ({ selected, parentId, id, children, developerName, name }) => {
  const classes = useCheckboxStyles();
  const { timeshifting, selectedDatasets, setSelectedDatasets, datasets, setSelectedFolder, selectedFolder } = useContext(GlobalContext);
  const [isSelected, setSelected] = useState(selected);
  const [isDisabled, setDisabled] = useState(true);
  useEffect(() => {
    if(selectedDatasets.indexOf(id)!==-1){
      setSelected(true);
    }else if(isSelected===true && children===undefined){
      setSelected(false);
    }else if(selectedFolder.folderId===id && children!==undefined && selectedDatasets.length===0){
      console.log('Hola')
      setSelected(false);
    }
    /*
    if(timeshifting.indexOf(id)!==-1){
      setSelected(false);
      setDisabled(true);
    }else{
      setSelected(false);
      setDisabled(false);
    }
    */
  }, [selectedDatasets]);
  useEffect(() => {
    if(id in datasets || parentId in datasets){
      setDisabled(false);
    }
  }, [datasets]);
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
        if (children){
          if(isSelected){
            setSelectedDatasets([]);
          }else{
            setSelectedDatasets(children.map((row) => row.Id));
            setSelectedFolder({folderApiName: developerName, folderLabel: name, folderId: id});
          }
        }else{
          if(isSelected){
            setSelectedDatasets(
              selectedDatasets.filter((selectedId) => selectedId !== id)
            );
          }else{
            setSelectedDatasets([...selectedDatasets, id]);
            setSelectedFolder({folderApiName: developerName, folderLabel: name, folderId: parentId});
          }
        }
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
