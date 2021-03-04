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
    const result = await templateAxios.get(`${API_URL}/data/template`);
    const cards = result.data.data;
    setOrgTemplates(cards);
  };

  const getAvailableTemplates = async () => {
    const result = await templateAxios.get(`${API_URL}/data/repository`);///${branch}
    const cards = result.data.data;
    setAvailableTemplates(cards);
  };

  return {getAvailableTemplates, getOrgTemplates};
};

export default useDeployCards;
