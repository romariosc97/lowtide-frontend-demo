import React, {useContext, useEffect} from 'react';
import { Button, CircularProgress, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import NavBar from '../components/Navbar';
import CardContainer from '../components/CardContainer';
import Card from '../components/DeployCard';
import useDeployCards from '../hooks/useDeployCards';
import useDeploy from '../hooks/useDeploy';

import '../assets/pagesStyles.scss';

import io from "socket.io-client";
//import { FilterContext } from '../context/FilterContext';
import { GlobalContext } from '../context/GlobalContext';

const API_URL = 'https://ltapi.herokuapp.com/api';
//const API_URL = 'http://localhost:8080/api';

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

const Deploy = () => {

  const socket = io(API_URL, {transports: ['websocket', 'polling', 'flashsocket']});
  const classes = useStyles();
  let [availableCards] = useDeployCards('available');
  let [orgCards] = useDeployCards('org');
  const [selectedTemplates, _, deployStatus, handleCardSelection, deployCards] = useDeploy();

  const { setDeploying, deploying, jobsDeployed, setJobsDeployed, actionDeployCounter } = useContext(GlobalContext);
  
  useEffect(() => {
    let isMounted = false;
    if(!isMounted){
        socket.emit("subscribeToJobUpdates");
        socket.on("jobEnded", data => {
          let deployingTmp = [];
          if(deploying.length>0){
            console.log('Deployed')
            for (let i = 0; i < deploying.length; i++) {
              if(data.template_keys.indexOf(deploying[i])===-1){
                deployingTmp.push(deploying[i]);
              }
            }
          }
          setDeploying(deployingTmp);
          setJobsDeployed([...jobsDeployed, data.id]);
        });
    }
    return () => { isMounted = true };
  }, [deploying]);

  

  return (
    <div className="fullPage">
      <NavBar activeTab="deploy" />
      <main className="main-wrapper">
        <h3 className="page-title">Deploy Templates</h3>
        <p className="page-description">
          Einstein Analytics application Templates ready to be deployed. Pick
          the ones you want from the available section and click DEPLOY to get
          them to your org. You can also check what templates you already have
          in the right section.
        </p>
        <div className="page-mainContainer">
          <CardContainer
            type="available"
            styles={{ width: '30vw', height: '65vh' }}
            title="Available Templates"
            searchPlaceholder="Search Templates"
          >
            {availableCards.length===0 ? <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="45vh" textAlign="center"><CircularProgress color="primary" style={{width:"35px", height:"35px"}}></CircularProgress></Box> : availableCards.map((card, i) => (
              <Card
                key={i}
                type={'available'}
                startExpanded={i === 0}
                warning={i === 6}
                data={{
                  name: card.template.label,
                  description: card.template.description,
                  tags: card.template.tags,
                  template_key: card.template.template_key,
                }}
                handleCardSelection={handleCardSelection}
              />
            ))}
          </CardContainer>

          <Button
            disableRipple
            disabled={selectedTemplates.length === 0 || deployStatus}
            classes={{
              root: classes.buttonRoot,
              label: classes.buttonLabel,
              disabled: classes.disabledRoot,
            }}
            onClick={() => deployCards()}
          >
            {deployStatus ? <CircularProgress color="primary" style={{width:"20px", height:"20px", float:'right'}}></CircularProgress> : 'Deploy'}
          </Button>

          <CardContainer
            type="org"
            styles={{ width: '30vw', height: '65vh' }}
            title="Your Org"
            searchPlaceholder="Search Templates"
          >
            {orgCards.length===0 ? <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="47.5vh" textAlign="center"><CircularProgress color="primary" style={{width:"35px", height:"35px"}}></CircularProgress></Box> : orgCards.map((card, i) => (
              <Card
                key={i}
                type={'org'}
                startExpanded={i === 0}
                warning={i === 6}
                data={{
                  name: card.template.label,
                  description: card.template.description,
                  tags: card.template.tags,
                }}
              />
            ))}
          </CardContainer>
        </div>
      </main>
    </div>
  );
};

export default Deploy;
