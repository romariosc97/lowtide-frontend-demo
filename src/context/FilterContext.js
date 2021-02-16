import React, { useState, createContext } from 'react';

const FilterContext = createContext();

const FilterContextProvider = (props) => {
  const [filterTexts, setFilterTexts] = useState({});
  const [filterResults, setFilterResults] = useState({});
  const [filterSource, setFilterSource] = useState({});

  const [allRepoTags, setAllRepoTags] = useState([]);
  const [selectedRepoTags, setSelectedRepoTags] = useState([]);

  const [allOrgTags, setAllOrgTags] = useState([]);
  const [selectedOrgTags, setSelectedOrgTags] = useState([]);

  const [selectedTemplates, setSelectedTemplates] = useState([]);

  return (
    <FilterContext.Provider
      value={{
        allRepoTags,
        setAllRepoTags,
        selectedRepoTags,
        setSelectedRepoTags,
        allOrgTags,
        setAllOrgTags,
        selectedOrgTags,
        setSelectedOrgTags,
        filterTexts,
        setFilterTexts,
        selectedTemplates,
        setSelectedTemplates,
        filterResults,
        setFilterResults,
        filterSource,
        setFilterSource
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export { FilterContextProvider, FilterContext };
