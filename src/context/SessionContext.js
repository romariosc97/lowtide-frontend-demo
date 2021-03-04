import React, { useState, createContext, useEffect, useContext } from 'react';
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
  const [sessionInfo, setSessionInfo] = useState({});
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
    return jobsAxios.get(`${API_URL}/data/job`);
  };

  useEffect(() => {
    let isMounted = false;
    if(!isMounted){
      const logMessage = function(message) {
			  console.log(message)
			}
      const setNewUsername = async () => {
        try {
          const [result, resultDetail] = await Promise.all([getSessionInfo(), getJobsDetail()]);
          setIsLoggedIn(true);
          const sessionInfo = result.data.data;
          const username = sessionInfo.salesforce.user.name;
          const instanceUrl = sessionInfo.salesforce.auth.instanceUrl;
          let jobs_tmp = [];
          for (let i = 0; i < result.data.data.jobHistory.length; i++) {
            if(resultDetail.data.data[i].returnvalue){
              
            }else{
              //jobs_tmp = jobs_tmp.concat(result.data.data.jobHistory[i].job_details.templates);
            }
          }
          setJobDetail(resultDetail.data.data)
          setDeploying(jobs_tmp);
          setSessionInfo({username: username, instanceUrl: instanceUrl});
        } catch (error) {
          setIsLoggedIn(false);
          setJobDetail([])
          setDeploying([]);
        }
        socket.emit('subscribeToJobUpdates', sessionInfo.socketRoom);
        const eventsList = [ 'jobStarted', 'jobInfo', 'jobSuccess', 'jobError', 'serverError' ];
        for (const e of eventsList) {
          socket.on(e, logMessage);
        }
        socket.on("jobSuccess", message => {
          if(message.event.message==='Succeeded'){
            if(message.data.job.name==='template_deploy'){
              setSocketAux({id: message.data.job.id, result: message.data.result.deployResult, status: message.data.status});

              enqueueSnackbar(`Template "${message.data.job.context.template}" has been deployed successfully!`, 
                {...SNACKBAR_DEFAULT, variant: 'success'}
              )
              
              setTemplatesDeployed([...templatesDeployed, message.data.job.context.template]);
              let deployingTmp = deploying.filter((value) => value !== message.data.job.context.template);
              setDeploying(deployingTmp);
  
            }else{
              if(message.data.status==='success'){
                enqueueSnackbar(`Job ${message.data.job.id} has been deployed successfully!`, 
                  {...SNACKBAR_DEFAULT, variant: 'success'}
                )
              }else{
                enqueueSnackbar(`Job ${message.data.job.id} has an error.`, 
                  {...SNACKBAR_DEFAULT, variant: 'error'}
                )
              }
            }
          }
        });
        socket.on("jobStarted", message => {
          setJobUpdates({...jobUpdates, [message.event.job.id]: 'Started'});
        });
        socket.on("jobInfo", data => {
          console.log(data, 'jobInfo');
        });
        socket.on("jobUpdate", message => {
          setJobUpdates({...jobUpdates, [message.event.job.id]: message.event.message});
        });
        socket.on("timeshiftUpdate", data => {
          console.log(data);
        });
      };
      setNewUsername();
    }
    return () => { isMounted = true };
  }, [loginAction]);

  return (
    <SessionContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, sessionInfo, setSessionInfo, jobs, setJobs, setLoginAction, loginAction }}
    >
      {props.children}
    </SessionContext.Provider>
  );
};

export { SessionContextProvider, SessionContext };
