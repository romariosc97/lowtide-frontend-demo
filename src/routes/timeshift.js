import React, {useEffect, useContext} from 'react';
import { Button, CircularProgress, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import NavBar from '../components/Navbar';
import Card from '../components/TimeshiftCard';
import OrgCard from '../components/TimeshiftOrgCard';
import CardContainer from '../components/CardContainer';
import { GlobalContext } from '../context/GlobalContext';
import { FilterContext } from '../context/FilterContext';
import '../assets/pagesStyles.scss';

import io from "socket.io-client";

import useTimeshift from '../hooks/useTimeshift';
import { SOCKET_URL } from '../config/configuration';

const useStyles = makeStyles({
  buttonLabel: {
    fontFamily: 'Open Sans',
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

  const { folders, orgFolders, selectedDatasets, setSelectedDatasets, setSelectedFolder, orgExpanded, pageLoading, setPageLoading } = useContext(GlobalContext);
  const { filterSource, setFilterSource, filterTexts } = useContext(FilterContext);
  const {getFolders, handleCardSelection, handleCardCollapse, timeshiftStatus, timeshift, setTimeshiftStatus, getOrgFolders} = useTimeshift();
  const classes = useStyles();

  useEffect(() => {
    let isMounted = false;
    if(!isMounted){
      document.title = 'Lowtide | Timeshift';
      getFolders();
      getOrgFolders();
      setPageLoading({...pageLoading, ['folder']: true, ['orgFolder']: true});
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

  useEffect(() => {
    let isMounted = false;
    if(!isMounted){
      if(pageLoading['folder'] && pageLoading['orgFolder']){
        setPageLoading({...pageLoading, ['folder']: false, ['orgFolder']: false});
      }else if(pageLoading['folder'] && !pageLoading['orgFolder']){
        setPageLoading({...pageLoading, ['folder']: false, ['orgFolder']: true});
      }else if(!pageLoading['folder'] && pageLoading['orgFolder']){
        setPageLoading({...pageLoading, ['folder']: true, ['orgFolder']: false});
      }
    }
    return () => { isMounted = true };
  }, [orgFolders]);

  useEffect(() => {
    let isMounted = false;
    if(!isMounted){
      if(!filterSource['orgFolder']){
        setFilterSource({...filterSource, ['orgFolder']: orgFolders});
      }
    }
    return () => { isMounted = true };
  }, [orgFolders, filterSource]);

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
            type="folder"
            styles={{ width: '30vw', height: '65vh' }}
            title="Analytics Apps"
            searchPlaceholder="Search Folders"
          >
            {folders.length===0 ? 
              (filterTexts['folder'] ? 
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" textAlign="center" marginTop={'30px'}>
                  No results found.
                </Box> :
                (
                  pageLoading['folder'] ? <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="45vh" textAlign="center"><CircularProgress color="primary" style={{width:"35px", height:"35px"}}></CircularProgress></Box>
                  : 
                  <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" textAlign="center" marginTop={'30px'}>
                    No datasets in repository.
                  </Box>
                )
              )
            : folders.map((card, i) => (
              <Card
                key={i}
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
            {timeshiftStatus ? <CircularProgress thickness={7.5} color="primary" style={{width:"20px", height:"20px", padding:"4px 33px"}}></CircularProgress> : 'Timeshift'}
          </Button>

          <CardContainer
            type="orgFolder"
            styles={{ width: '30vw', height: '65vh' }}
            title="Timeshifting Dataflows"
            searchPlaceholder="Search Org Folders"
          >
            {orgFolders.length===0 ? 
              (filterTexts['orgFolder'] ? 
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" textAlign="center" marginTop={'30px'}>
                  No results found.
                </Box> :
                (
                  pageLoading['orgFolder'] ? <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="45vh" textAlign="center"><CircularProgress color="primary" style={{width:"35px", height:"35px"}}></CircularProgress></Box>
                  : 
                  <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" textAlign="center" marginTop={'30px'}>
                    No dataflows in your org.
                  </Box>
                )
              ) 
            : 
            Object.keys(orgExpanded).length>0 ?
            orgFolders.map((card, i) => (
              <OrgCard
                key={i}
                data={{
                  id: card.Id,
                  name: card.MasterLabel,
                  type: card.attributes.type,
                  dataFlowType: card.DataflowType,
                  developer: card.DeveloperName,
                  createdDate: card.CreatedDate
                }}

              />
            )): 'Sin resultados.'}
          </CardContainer>
        </div>
      </main>
    </div>
  );
}

export default Timeshift;
