import { useContext, useState } from 'react';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalContext';
import { FilterContext } from '../context/FilterContext';
import { API_URL } from '../config/configuration';

const useTimeshift = () => {
  const [timeshiftStatus, setTimeshiftStatus] = useState(false);
  const [expanded, setExpanded] = useState({});
  const { filterSource, setFilterSource } = useContext(FilterContext);
  const { setFolders, datasets, setDatasets, selectedDatasets, setSelectedDatasets, selectedFolder, setOrgFolders, setOrgExpanded } = useContext(GlobalContext);
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
      const result = await folderAxios.get(`${API_URL}/data/dataset/folder/${id}`);
      setDatasets({...datasets, [id]: result.data.data})
    }
  };

  const getFolders = async () => {
    const datasetAxios = axios.create({
      withCredentials: true,
    });
    const result = await datasetAxios.get(`${API_URL}/data/folder`);
    setFilterSource({...filterSource, ['folder']: result.data.data});
    setFolders(result.data.data);
  };

  const timeshift = async () => {
    setTimeshiftStatus(true);
    const datasetAxios = axios.create({
      withCredentials: true,
    });
    console.log('Timeshift TEST.')
    /* await datasetAxios.post(`${API_URL}/org/timeshift`, {
      folderApiName: selectedFolder.folderApiName,
      folderLabel: selectedFolder.folderLabel,
      datasetArray: selectedDatasets
    }); */

  };

  const getOrgFolders = async () => {
    const datasetAxios = axios.create({
      withCredentials: true,
    });
    const result = await datasetAxios.get(`${API_URL}/data/dataflow/timeshift`);
    setOrgFolders(result.data.data);
    let tmp = {};
    for (let i = 0; i < result.data.data.length; i++) {
      tmp = {...tmp, [result.data.data[i].Id]: false};
    }
    setOrgExpanded(tmp);
  }

  return {getFolders: getFolders, handleCardSelection: handleCardSelection, handleCardCollapse: handleCardCollapse, expanded: expanded, setExpanded: setExpanded, timeshift: timeshift, timeshiftStatus: timeshiftStatus, setTimeshiftStatus: setTimeshiftStatus, getOrgFolders: getOrgFolders};
};

export default useTimeshift;
