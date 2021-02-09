import React, { useState, createContext } from 'react';

const GlobalContext = createContext();

const GlobalContextProvider = (props) => {

  const [jobsPending, setJobsPending] = useState(false);
  const [deploying, setDeploying] = useState([]);
  const [templatesDeployed, setTemplatesDeployed] = useState([]);
  const [socketAux, setSocketAux] = useState({});
  const [jobDetail, setJobDetail] = useState([]);
  const [jobsDeployed, setJobsDeployed] = useState({});
  const [actionJobCounter, setActionJobCounter] = useState(0);
  const [actionDeployCounter, setActionDeployCounter] = useState(0);
  const [jobUpdates, setJobUpdates] = useState({});

  const [folders, setFolders] = useState([]);
  const [orgFolders, setOrgFolders] = useState([]);
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
        setFolders,
        orgFolders,
        setOrgFolders,
        jobUpdates,
        setJobUpdates,
        templatesDeployed,
        setTemplatesDeployed,
        socketAux,
        setSocketAux
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export { GlobalContextProvider, GlobalContext };