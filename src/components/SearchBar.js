import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, TextField, MenuItem } from '@material-ui/core';

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
  const { setAvailableTemplates, setOrgTemplates } = useContext(GlobalContext);
  const { filterTexts, setFilterTexts, filterResults, setFilterResults, filterSource, filterField, setFilterField } = useContext(FilterContext);

  const handleChange = (e) => {

    let filtered = [];
    let pattern = '';

    switch (filterField[type]) {
      case 'name':
        setText(e.target.value);
        setFilterTexts({...filterTexts, [type]: e.target.value});
        pattern = e.target.value;
        filtered = filterSource[type].filter((value) => (value.template.label.toLowerCase()).indexOf(pattern.toLowerCase()) !== -1);
        setFilterResults({...filterResults, [type]: filtered});
        break;
      case 'tag':
        //console.log('no se filtrar');
        //filtered = filterSource[type];
        setText(e.target.value);
        setFilterTexts({...filterTexts, [type]: e.target.value});
        pattern = e.target.value;
        filtered = filterSource[type].filter(
          (value) => {
            let auxiliar = false;
            if('tags' in value.template){
              for (let i = 0; i < value.template.tags.length; i++) {
                if((value.template.tags[i].toLowerCase()).indexOf(pattern.toLowerCase()) !== -1){
                  auxiliar = true;
                } 
              }
            }
            return auxiliar;
          }
        );
        setFilterResults({...filterResults, [type]: filtered});
        break;
    
      default:
        setText(e.target.value);
        setFilterTexts({...filterTexts, [type]: e.target.value});
        pattern = e.target.value;
        filtered = filterSource[type].filter((value) => (value.template.label.toLowerCase()).indexOf(pattern.toLowerCase()) !== -1);
        setFilterResults({...filterResults, [type]: filtered});
        break;
    }

    switch(type){
      case 'available':
        setAvailableTemplates(filtered);
        break;
      case 'org':
        setOrgTemplates(filtered);
        break;
      default:
        console.log('An error ocurred.')
        break;
    }
  };
  const handleSelectChange = (e) => {
    setFilterField({...filterField, [type]: e.target.value});
  };

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        value={text}
        onChange={(e) => handleChange(e)}
      />
      {
        <TextField
          className={classes.select}
          id="filterField"
          select
          label=""
          value={filterField[type] || 'name'}
          onChange={handleSelectChange}
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
