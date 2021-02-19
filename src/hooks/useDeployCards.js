import { useContext } from 'react';
import axios from 'axios';
import { API_URL } from '../config/configuration';
import { GlobalContext } from '../context/GlobalContext';

const useDeployCards = () => {
  //const [orgfilterTexts, setOrgfilterTexts] = useState([]);
  const { branch, setAvailableTemplates, setOrgTemplates } = useContext(GlobalContext);
  
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
