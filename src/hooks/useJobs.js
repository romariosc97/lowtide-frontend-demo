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
            const [result, resultDetail] = await Promise.all([sessionAxios.get(`${API_URL}/auth/session`), sessionAxios.get(`${API_URL}/jobs/session/all`)]);
            let jobsDetailTmp = [];
            for (let i = 0; i < result.data.jobs.length; i++) {
                if(typeof resultDetail.data[i] !== 'undefined'){
                    if(resultDetail.data[i].result){
                    
                    }else{
                        jobsDetailTmp = jobsDetailTmp.concat(result.data.jobs[i].job_details.templates);
                    }
                }
            }
            setJobDetail(resultDetail.data);
            //const result = await sessionAxios.get(`${API_URL}/auth/session`);
            let jobsTmp = result.data.jobs;
            let date;
            for (let i = 0; i < jobsTmp.length; i++) {
                date = new Date(jobsTmp[i].run_at);
                jobsTmp[i].run_at = date.toLocaleString();
            }
            setJobs(jobsTmp);
            if(jobsTmp.length<=0)
                setJobStatus(false);
            let expanded_tmp = {};
            for (let i = 0; i < jobsTmp.length; i++) {
                if(jobsTmp[i].job_name==="Deploy Operation"){
                    for (let ia = 0; ia < jobsTmp[i].job_details.templates.length; ia++) {
                        expanded_tmp[`panel${i}-${ia}`] = false;
                    }
                }else{
                    expanded_tmp[`panel-timeshift-${i}-df1`] = false;
                    expanded_tmp[`panel-timeshift-${i}-df2`] = false;
                }
            }
            setExpanded(expanded_tmp);
        } catch (error) {
            setJobStatus(false);
            console.log(error.message);
        }
    };
    return {jobs:jobs, getSessionJobs:getSessionJobs, expanded:expanded, setExpanded:setExpanded, jobStatus:jobStatus};
};
  
export default useJobs;