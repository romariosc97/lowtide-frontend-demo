import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, TextField, MenuItem } from '@material-ui/core';

import FilterBox from './FilterBox';
import { FilterContext } from '../context/FilterContext';
import { GlobalContext } from '../context/GlobalContext';

const useStyles = makeStyles({
  root: {
    padding: '8px 1rem',
    display: 'flex',
    borderRadius: '7px',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  input: {
    fontFamily: 'Open Sans',
    fontSize: '.8rem',
    flex: 1,
  },
  select: {
    width: '75px',
    '& .MuiInput-underline':{
      '& .MuiInputBase-input': {
        fontFamily: 'Open Sans',
        fontSize: '14px'
      },
      '& .MuiInput-input': {
        paddingLeft: '7.5px',
      },
      '&::before, &:hover, &:hover:not(.Mui-disabled):before, &::after': {
        borderBottom: 'none',
      }
    }
  }
});

const SearchBar = ({ type, placeholder }) => {
  const classes = useStyles();

  const [text, setText] = useState('');

  // get these values if the component is wrapped up by the FiltersContext, otherwise make them null
  const { availableTemplates, setAvailableTemplates, orgTemplates, setOrgTemplates } = useContext(GlobalContext);
  const isDeployPage = Boolean(useContext(FilterContext));
  const { filterTexts, setFilterTexts, filterResults, setFilterResults, filterSource } = useContext(FilterContext);

  const handleChange = (e) => {
    setText(e.target.value);
    setFilterTexts({...filterTexts, [type]: e.target.value});
    let pattern = e.target.value;
    let filtered = filterSource[type].filter((value) => (value.template.label.toLowerCase()).indexOf(pattern.toLowerCase()) !== -1);
    setFilterResults({...filterResults, [type]: filtered});
    switch(type){
      case 'available':
        setAvailableTemplates(filtered);
        break;
      case 'org':
        setOrgTemplates(filtered);
        break;
    }
  };

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        value={text}
        onChange={(e) => handleChange(e)}
      />
      {/* FilterBox only for deploy page */}
      {/* isDeployPage && <FilterBox type={type} /> */}
      {
        <TextField
          className={classes.select}
          id="standard-select-currency"
          select
          label=""
          value={'name'}
          //onChange={handleChange}
          helperText=""
        >
          <MenuItem value={'name'}>
            Name
          </MenuItem>
          <MenuItem value={'tag'}>
            Tag
          </MenuItem>
        </TextField>
      }
    </Paper>
  );
};

export default SearchBar;
