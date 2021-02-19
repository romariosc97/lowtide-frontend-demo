import { useContext } from 'react';
import axios from 'axios';
import { API_URL } from '../config/configuration';
import { useSnackbar } from 'notistack';
import { SNACKBAR_DEFAULT } from '../config/configuration';
import { GlobalContext } from '../context/GlobalContext';
    
const useTimeshiftOrgCard = () => {
    
    const { setOrgFolders, orgFolders, orgExpanded, setOrgExpanded } = useContext(GlobalContext);
    const { enqueueSnackbar } = useSnackbar();
    const templateAxios = axios.create({
        withCredentials: true,
    });
    const deleteOrgDataset = async (dataflowId) => {
        try {
            await templateAxios.delete(`${API_URL}/org/dataflow/single/${dataflowId}`);
            setOrgFolders(
                orgFolders.filter((value) => {
                    return value.Id !== dataflowId
                })
            );
            enqueueSnackbar(`Deleted successfully.`, 
                {...SNACKBAR_DEFAULT, variant: 'success'}
            );
        } catch (error) {
            enqueueSnackbar(`An unexpected error has occurred.`, 
                {...SNACKBAR_DEFAULT, variant: 'error'}
            );
            
        }
    };
    const handleOrgExpanded = (id) => {
        setOrgExpanded({
          ...orgExpanded,
          [id]: orgExpanded[id] ? false : true
        });
    };
    return {deleteOrgDataset, orgExpanded, setOrgExpanded, handleOrgExpanded};
};

export default useTimeshiftOrgCard;