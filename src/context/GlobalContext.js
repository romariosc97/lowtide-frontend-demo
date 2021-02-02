import React, { useState, createContext } from 'react';

const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
  const [username, setUsername] = useState(null);

  const [jobsPending, setJobsPending] = useState(false);
  const [deploying, setDeploying] = useState([]);
  const [jobDetail, setJobDetail] = useState([]);
  const [jobsDeployed, setJobsDeployed] = useState([]);
  const [actionJobCounter, setActionJobCounter] = useState(0);
  const [actionDeployCounter, setActionDeployCounter] = useState(0);

  const [folders, setFolders] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [selectedDatasets, setSelectedDatasets] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState({});
  const [timeshifting, setTimeshifting] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        jobsPending,
        setJobsPending,
        deploying, 
        setDeploying,
        jobDetail, 
        setJobDetail,
        jobsDeployed,
        setJobsDeployed,
        actionJobCounter,
        setActionJobCounter,
        actionDeployCounter,
        setActionDeployCounter,
        datasets,
        setDatasets,
        selectedDatasets,
        setSelectedDatasets,
        selectedFolder,
        setSelectedFolder,
        timeshifting,
        setTimeshifting,
        folders,
        setFolders
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export { GlobalContextProvider, GlobalContext };