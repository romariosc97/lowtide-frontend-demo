import React, {useEffect, useContext} from 'react';
import { Button, CircularProgress, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import NavBar from '../components/Navbar';
import Card from '../components/TimeshiftCard';
import CardContainer from '../components/CardContainer';
import { GlobalContext } from '../context/GlobalContext';
import '../assets/pagesStyles.scss';

import io from "socket.io-client";

import useTimeshift from '../hooks/useTimeshift';

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

const SOCKET_URL = 'https://ltapi.herokuapp.com/';
//const SOCKET_URL = 'http://localhost:8080/';

function Timeshift() {

  const socket = io(SOCKET_URL, {transports: ['websocket', 'polling', 'flashsocket']});

  const { folders, selectedDatasets, setSelectedDatasets, setSelectedFolder } = useContext(GlobalContext);
  const {getFolders, handleCardSelection, handleCardCollapse, timeshiftStatus, timeshift, setTimeshiftStatus} = useTimeshift();
  const classes = useStyles();

  useEffect(() => {
    let isMounted = false;
    if(!isMounted){
      getFolders();
      socket.emit("subscribeToJobUpdates");
      socket.on("jobUpdate", data => {
        console.log(data);
      });
      socket.on("timeshiftUpdate", data => {
        console.log(data);
      });
      socket.on("jobEnded", data => {
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
                type={'available'}
                startExpanded={i === 0}
                warning={i === 6}
                data={{
                  id: card.Id,
                  name: card.Name,
                  type: card.Type,
                  developer: card.DeveloperName,
                  index: i
                }}
                handleCardSelection={handleCardSelection}
                handleCardCollapse={handleCardCollapse}
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

          ></CardContainer>
        </div>
      </main>
    </div>
  );
}

export default Timeshift;
