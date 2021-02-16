import { useState, useEffect, useContext } from 'react';
import { FilterContext } from '../context/FilterContext';
import axios from 'axios';
import io from "socket.io-client";
import { SOCKET_URL, API_URL } from '../config/configuration';
import { GlobalContext } from '../context/GlobalContext';

const useDeployCards = () => {
  //const [orgfilterTexts, setOrgfilterTexts] = useState([]);
  const { branch, setAvailableTemplates, setOrgTemplates, availableTemplates, orgTemplates } = useContext(GlobalContext);
  
  const {

  } = useContext(FilterContext);
  
  const templateAxios = axios.create({
    withCredentials: true,
  });

  const getOrgTemplates = async () => {
    const result = await templateAxios.get(`${API_URL}/org/template`);
    const cards = result.data;
    setOrgTemplates(cards);
  };

  const getAvailableTemplates = async () => {
    const result = await templateAxios.get(`${API_URL}/repository/template/${branch}`);
    const cards = result.data;
    setAvailableTemplates(cards);
  };

  return {getAvailableTemplates, getOrgTemplates};
};

export default useDeployCards;
