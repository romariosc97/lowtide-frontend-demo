import { useState, useContext } from 'react';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalContext';
import { API_URL } from '../config/configuration';

const useDeploy = () => {
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [deployStatus, setDeployStatus] = useState(false);
  const { setJobsPending, setDeploying, deploying, actionDeployCounter, setActionDeployCounter, jobUpdates, setJobUpdates, branch } = useContext(GlobalContext);

  const handleCardSelection = (key, selected) => {
    if (selected) {
      setSelectedTemplates([...selectedTemplates, key]);
    } else {
      setSelectedTemplates(
        selectedTemplates.filter((selectedKey) => selectedKey !== key)
      );
    }
  };

  const deployCards = async () => {
    if (selectedTemplates.length === 0) return alert('Select at least 1 card');
    setDeployStatus(true);
    setActionDeployCounter(actionDeployCounter+selectedTemplates.length);
    try {
      const deployAxios = axios.create({
        withCredentials: true,
      });
      
      let tmp = selectedTemplates;

      setSelectedTemplates([]);
      setDeploying([...deploying, ...tmp]);

      const result = await deployAxios.post(`${API_URL}/repository/template/${branch}/deploy`, {
        "templates": selectedTemplates
      });

      setDeployStatus(false);
      setJobsPending(true);
      setJobUpdates({...jobUpdates, [result.data.job_id]: "Deploying."});
    } catch (error) {
      setDeployStatus(false);
      console.log(error.message);
      
    }
  };

  return {selectedTemplates, setSelectedTemplates, deployStatus, handleCardSelection, deployCards};
};

export default useDeploy;
