import { useContext, useState } from 'react';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalContext';

const API_URL = 'https://ltapi.herokuapp.com/api';
//const API_URL = 'http://localhost:8080/api';

const useTimeshift = () => {
  const [timeshiftStatus, setTimeshiftStatus] = useState(false);
  const [expanded, setExpanded] = useState({});
  const { setFolders, datasets, setDatasets, selectedDatasets, setSelectedDatasets, selectedFolder } = useContext(GlobalContext);
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
    
    const result = await datasetAxios.post(`${API_URL}/org/timeshift`, {
      folderApiName: selectedFolder.folderApiName,
      folderLabel: selectedFolder.folderLabel,
      datasetArray: selectedDatasets
    });
  };

  return {getFolders: getFolders, handleCardSelection: handleCardSelection, handleCardCollapse: handleCardCollapse, expanded: expanded, setExpanded: setExpanded, timeshift: timeshift, timeshiftStatus: timeshiftStatus, setTimeshiftStatus: setTimeshiftStatus};
};

export default useTimeshift;
