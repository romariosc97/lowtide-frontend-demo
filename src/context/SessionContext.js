import React, { useState, createContext, useEffect, useContext } from 'react';
//import { sessionInfoResponse } from '../mockData';
import axios from 'axios';
import { GlobalContext } from './GlobalContext';
import { useSnackbar } from 'notistack';
import io from "socket.io-client";
import { API_URL, SOCKET_URL } from '../config/configuration';

const SessionContext = createContext();

const SessionContextProvider = (props) => {

  const socket = io(SOCKET_URL, {transports: ['websocket', 'polling', 'flashsocket']});
  const { enqueueSnackbar } = useSnackbar();

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [username, setUsername] = useState(null);
  const [jobs, setJobs] = useState([]);
  const { setDeploying, setJobDetail, setActionJobCounter, actionJobCounter, setActionDeployCounter, actionDeployCounter } = useContext(GlobalContext);

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

  const setNewUsername = async () => {
    socket.emit("subscribeToJobUpdates");
    socket.on("jobEnded", data => {
      console.log(data);
      setActionJobCounter(actionJobCounter+1);
      enqueueSnackbar(`Job ${data.id} have been deployed successfully!`, 
        {
          variant: 'success',
          autoHideDuration: 6000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          }
        }
      )
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
      setActionDeployCounter(actionDeployCounter+1);
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    let isMounted = false;
    if(!isMounted){
      setNewUsername();
    }
    return () => { isMounted = true };
  }, []);

  return (
    <SessionContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, username, setUsername, jobs, setJobs, setNewUsername }}
    >
      {props.children}
    </SessionContext.Provider>
  );
};

export { SessionContextProvider, SessionContext };
