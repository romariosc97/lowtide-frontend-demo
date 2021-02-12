import { useState, useEffect, useContext } from 'react';
import { FilterContext } from '../context/FilterContext';
import axios from 'axios';
import io from "socket.io-client";
import { SOCKET_URL, API_URL } from '../config/configuration';
import { GlobalContext } from '../context/GlobalContext';

const useDeployCards = (type) => {
  const [cards, setCards] = useState([]);
  const { branch, setBranchTemplates, setOrgTemplates } = useContext(GlobalContext);

  const {
    setAllRepoTags,
    setAllOrgTags,
    selectedRepoTags,
    selectedOrgTags,
    repoSearchText,
    orgSearchText,
  } = useContext(FilterContext);

  const templateAxios = axios.create({
    withCredentials: true,
  });

  const getOrgTemplates = async () => {
    const result = await templateAxios.get(`${API_URL}/org/template`);
    const cards = result.data;
    setOrgTemplates(cards);
  };

  const getBranchTemplates = async () => {
    const result = await templateAxios.get(`${API_URL}/repository/template/${branch}`);
    const cards = result.data;
    setBranchTemplates(cards);
  };

  return {getBranchTemplates, getOrgTemplates};
};

export default useDeployCards;
