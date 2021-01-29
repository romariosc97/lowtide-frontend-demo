import { useState, useContext } from 'react';
import axios from 'axios';
//import { FilterContext } from '../context/FilterContext';
import { GlobalContext } from '../context/GlobalContext';

const API_URL = 'https://ltapi.herokuapp.com/api';
//const API_URL = 'http://localhost:8080/api';

const useDeploy = () => {
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [deployStatus, setDeployStatus] = useState(false);
  //const { setDeploying } = useContext(FilterContext);
  const { setJobsPending, setDeploying, deploying, actionDeployCounter, setActionDeployCounter } = useContext(GlobalContext);

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
    // Write code to deploy the cards
    if (selectedTemplates.length === 0) return alert('Select at least 1 card');
    setDeployStatus(true);
    setActionDeployCounter(actionDeployCounter+1);
    try {
      const deployAxios = axios.create({
        withCredentials: true,
      });
      
      let tmp = selectedTemplates;

      setSelectedTemplates([]);
      setDeploying([...deploying, ...tmp]);

      await deployAxios.post(`${API_URL}/repository/template/beta/deploy`, {
        "templates": selectedTemplates
      });

      setDeployStatus(false);
      setJobsPending(true);
      console.log(deploying, 'Button Clicked');
    } catch (error) {
      setDeployStatus(false);
      console.log(error.message);
      
    }
  };

  return [selectedTemplates, setSelectedTemplates, deployStatus, handleCardSelection, deployCards];
};

export default useDeploy;
