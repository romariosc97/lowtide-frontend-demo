import { useContext, useState } from 'react';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalContext';
import { API_URL } from '../config/configuration';

const useTimeshift = () => {
  const [timeshiftStatus, setTimeshiftStatus] = useState(false);
  const [expanded, setExpanded] = useState({});
  const { setFolders, datasets, setDatasets, selectedDatasets, setSelectedDatasets, selectedFolder, setOrgFolders } = useContext(GlobalContext);
  const handleCardSelection = (key, selected) => {
    if (selected) {
      setSelectedDatasets([...selectedDatasets, key]);
    } else {
      setSelectedDatasets(
        selectedDatasets.filter((selectedKey) => selectedKey !== key)
      );
    }
  };

  const handleCardCollapse = async (id) => {
    if(id in datasets){

    }else{
      const folderAxios = axios.create({
        withCredentials: true,
      });
      const result = await folderAxios.get(`${API_URL}/org/dataset/${id}`);
      setDatasets({...datasets, [id]: result.data})
    }
  };

  const getFolders = async () => {
    const datasetAxios = axios.create({
      withCredentials: true,
    });
    const result = await datasetAxios.get(`${API_URL}/org/folder`);
    setFolders(result.data);
  };

  const timeshift = async () => {
    setTimeshiftStatus(true);
    const datasetAxios = axios.create({
      withCredentials: true,
    });
    
    await datasetAxios.post(`${API_URL}/org/timeshift`, {
      folderApiName: selectedFolder.folderApiName,
      folderLabel: selectedFolder.folderLabel,
      datasetArray: selectedDatasets
    });
  };

  const getOrgFolders = async () => {
    const datasetAxios = axios.create({
      withCredentials: true,
    });
    const result = await datasetAxios.get(`${API_URL}/org/dataflow/timeshift`);
    setOrgFolders(result.data);
  }

  return {getFolders: getFolders, handleCardSelection: handleCardSelection, handleCardCollapse: handleCardCollapse, expanded: expanded, setExpanded: setExpanded, timeshift: timeshift, timeshiftStatus: timeshiftStatus, setTimeshiftStatus: setTimeshiftStatus, getOrgFolders: getOrgFolders};
};

export default useTimeshift;
