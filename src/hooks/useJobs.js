import { useState, useContext } from 'react';
import axios from 'axios';
import { SessionContext } from '../context/SessionContext';
import { GlobalContext } from '../context/GlobalContext';
import { API_URL } from '../config/configuration';

const useJobs = () => {
    const { jobs, setJobs } = useContext(SessionContext);
    const [expanded, setExpanded] = useState({});
    const [jobStatus, setJobStatus] = useState(true);
    const { setJobDetail } = useContext(GlobalContext);
    const getSessionJobs = async () => {
        const sessionAxios = axios.create({
            withCredentials: true,
        });
        try {
            const [result, resultDetail] = await Promise.all([sessionAxios.get(`${API_URL}/auth/session`), sessionAxios.get(`${API_URL}/data/job`)]);
            let jobsDetailTmp = [];
            for (let i = 0; i < result.data.data.jobHistory.length; i++) {
                if(typeof resultDetail.data.data[i] !== 'undefined'){
                    if(resultDetail.data.data[i].returnvalue){
                    
                    }else{
                        //jobsDetailTmp = jobsDetailTmp.concat(result.data.data.jobHistory[i].job_details.templates);
                    }
                }
            }
            //setJobDetail(resultDetail.data.data);
            //const result = await sessionAxios.get(`${API_URL}/auth/session`);
            console.log('Hola 1');
            let jobDetailTmp = resultDetail.data.data;
            let date;
            for (let i = 0; i < jobDetailTmp.length; i++) {
                date = new Date(jobDetailTmp[i].processedOn);
                jobDetailTmp[i].processedOn = date.toLocaleString();
                if(jobDetailTmp[i].finishedOn){
                    date = new Date(jobDetailTmp[i].finishedOn);
                    jobDetailTmp[i].finishedOn = date.toLocaleString();
                }
            }
            console.log('Hola 2');
            setJobDetail(jobDetailTmp);
            setJobs(result.data.data.jobHistory);
            if(jobDetailTmp.length<=0)
                setJobStatus(false);
            console.log('Hola 3', jobDetailTmp);
            let expanded_tmp = {};
            for (let i = 0; i < jobDetailTmp.length; i++) {
                if(jobDetailTmp[i].name==="template_deploy"){
                    expanded_tmp[`panel-deploy-${i}`] = false;
                }else{
                    expanded_tmp[`panel-timeshift-${i}-df1`] = false;
                    expanded_tmp[`panel-timeshift-${i}-df2`] = false;
                }
            }
            console.log('Hola 4');
            setExpanded(expanded_tmp);
        } catch (error) {
            setJobStatus(false);
            console.log(error.message);
        }
    };
    return {jobs:jobs, getSessionJobs:getSessionJobs, expanded:expanded, setExpanded:setExpanded, jobStatus:jobStatus};
};
  
export default useJobs;