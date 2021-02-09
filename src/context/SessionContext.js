import React, { useState, createContext, useEffect, useContext } from 'react';
//import { sessionInfoResponse } from '../mockData';
import axios from 'axios';
import { GlobalContext } from './GlobalContext';
import { useSnackbar } from 'notistack';
import io from "socket.io-client";
import { API_URL, SOCKET_URL, SNACKBAR_DEFAULT } from '../config/configuration';

const SessionContext = createContext();

const SessionContextProvider = (props) => {

  const socket = io(SOCKET_URL, {transports: ['websocket', 'polling', 'flashsocket']});
  const { enqueueSnackbar } = useSnackbar();

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [username, setUsername] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loginAction, setLoginAction] = useState(0);
  const { setDeploying, setJobDetail, setSocketAux, jobUpdates, setJobUpdates, deploying, setTemplatesDeployed, templatesDeployed } = useContext(GlobalContext);

  const getSessionInfo = async () => {
    const sessionAxios = axios.create({
      withCredentials: true,
    });
    return sessionAxios.get(`${API_URL}/auth/session`);
  };
  const getJobsDetail = async () => {
    const jobsAxios = axios.create({
      withCredentials: true,
    });
    return jobsAxios.get(`${API_URL}/jobs/session/all`);
  };

  useEffect(() => {
    let isMounted = false;
    if(!isMounted){
      let consola = 0;
      const setNewUsername = async () => {
        socket.emit("subscribeToJobUpdates");
        socket.on("jobEnded", data => {
          if(data.template_keys){
            setSocketAux({id: data.id, result: data.result});
            if(data.template_keys.length===1){
              enqueueSnackbar(`Template "${data.template_keys[0]}" has been deployed successfully!`, 
                {...SNACKBAR_DEFAULT, variant: 'success'}
              )
            }else{
              enqueueSnackbar(`${data.template_keys.length} templates have been deployed successfully!`, 
                {...SNACKBAR_DEFAULT, variant: 'success'}
              )
            }
            setTemplatesDeployed([...templatesDeployed, ...data.template_keys]);
            let deployingTmp = [];
            for (let i = 0; i < deploying.length; i++) {
              if(data.template_keys.indexOf(deploying[i])===-1){
                deployingTmp.push(deploying[i]);
              }
            }
            setDeploying(deployingTmp);

          }else{
            if(data.result.success){
              enqueueSnackbar(`Job ${data.id} have been deployed successfully!`, 
                {...SNACKBAR_DEFAULT, variant: 'success'}
              )
            }else{
              enqueueSnackbar(`Job ${data.id}: ${data.result.message}`, 
                {...SNACKBAR_DEFAULT, variant: 'error'}
              )
            }
          }
        });
        socket.on("jobUpdate", data => {
          if(data.job!==undefined){
            consola = data.job.id;
            setJobUpdates({...jobUpdates, [data.job.id]: data.message});
          }else{
            if(consola > 0){
              setJobUpdates({...jobUpdates, [consola]: data.message});
            }
          }
        });
        socket.on("timeshiftUpdate", data => {
          console.log(data);
        });
        try {
          const [result, resultDetail] = await Promise.all([getSessionInfo(), getJobsDetail()]);
          setIsLoggedIn(true);
          const sessionInfo = result.data;
          const username = sessionInfo.salesforce.user.name;
          let jobs_tmp = [];
          for (let i = 0; i < result.data.jobs.length; i++) {
            if(resultDetail.data[i].result){
              
            }else{
              jobs_tmp = jobs_tmp.concat(result.data.jobs[i].job_details.templates);
            }
          }
          setJobDetail(resultDetail.data)
          setDeploying(jobs_tmp);
          setUsername(username);
        } catch (error) {
          setIsLoggedIn(false);
        }
      };
      setNewUsername();
    }
    return () => { isMounted = true };
  }, [loginAction]);

  return (
    <SessionContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, username, setUsername, jobs, setJobs, setLoginAction, loginAction }}
    >
      {props.children}
    </SessionContext.Provider>
  );
};

export { SessionContextProvider, SessionContext };
