import React, {useEffect, useContext} from 'react';
import { Button, CircularProgress, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import NavBar from '../components/Navbar';
import Card from '../components/TimeshiftCard';
import OrgCard from '../components/TimeshiftOrgCard';
import CardContainer from '../components/CardContainer';
import { GlobalContext } from '../context/GlobalContext';
import '../assets/pagesStyles.scss';

import io from "socket.io-client";

import useTimeshift from '../hooks/useTimeshift';
import { SOCKET_URL } from '../config/configuration';

const useStyles = makeStyles({
  buttonLabel: {
    fontFamily: 'Montserrat',
    fontSize: '1rem',
    fontWeight: '700',
  },
  buttonRoot: {
    height: 'fit-content',
    padding: '4px 12px',
    color: 'white',
    backgroundColor: '#005FB2',
    '&:hover, &:focus': {
      backgroundColor: '#016dcc',
    },
  },
  disabledRoot: {
    backgroundColor: '#F6F6F6',
  },
});

function Timeshift() {

  const socket = io(SOCKET_URL, {transports: ['websocket', 'polling', 'flashsocket']});

  const { folders, orgFolders, selectedDatasets, setSelectedDatasets, setSelectedFolder } = useContext(GlobalContext);
  const {getFolders, timeshiftStatus, timeshift, setTimeshiftStatus, getOrgFolders} = useTimeshift();
  const classes = useStyles();

  useEffect(() => {
    let isMounted = false;
    if(!isMounted){
      getFolders();
      getOrgFolders();
      socket.emit("subscribeToJobUpdates");
      socket.on("jobEnded", data => {
        if(data.result.success){

        }else{
          
        }
        setSelectedDatasets([]);
        setTimeshiftStatus(false);
        setSelectedFolder({});
      });
    }
    return () => { isMounted = true };
  }, []);
  return (
    <div className="fullPage">
      <NavBar activeTab="timeshift" />
      <main className="main-wrapper">
        <h3 className="page-title">Timeshifting Dataflow</h3>
        <p className="page-description">
          Run timeshifting on selected datasets of the Analytics Apps you have
          deployed to your organization, so you can show better data in your
          demos!
        </p>
        <div className="page-mainContainer">
          <CardContainer
            styles={{ width: '30vw', height: '65vh' }}
          >
            {folders.length===0 ? <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="45vh" textAlign="center"><CircularProgress color="primary" style={{width:"35px", height:"35px"}}></CircularProgress></Box> : folders.map((card, i) => (
              <Card
                key={i}
                data={{
                  id: card.Id,
                  name: card.Name,
                  type: card.Type,
                  developer: card.DeveloperName,
                  index: i
                }}
              />
            ))}
          </CardContainer>

          <Button
            disableRipple
            disabled={selectedDatasets.length === 0 || timeshiftStatus}
            classes={{
              root: classes.buttonRoot,
              label: classes.buttonLabel,
              disabled: classes.disabledRoot,
            }}
            onClick={() => timeshift()}
          >
            {timeshiftStatus ? <CircularProgress color="primary" style={{width:"20px", height:"20px", float:'right'}}></CircularProgress> : 'Timeshift'}
          </Button>

          <CardContainer
            styles={{ width: '30vw', height: '65vh' }}

          >
            {orgFolders.length===0 ? <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="45vh" textAlign="center"><CircularProgress color="primary" style={{width:"35px", height:"35px"}}></CircularProgress></Box> : orgFolders.map((card, i) => (
              <OrgCard
                key={i}
                type={'available'}
                data={{
                  id: card.Id,
                  name: card.MasterLabel,
                  type: card.attributes.type,
                  dataFlowType: card.DataflowType,
                  developer: card.DeveloperName,
                  createdDate: card.CreatedDate
                }}

              />
            ))}
          </CardContainer>
        </div>
      </main>
    </div>
  );
}

export default Timeshift;
