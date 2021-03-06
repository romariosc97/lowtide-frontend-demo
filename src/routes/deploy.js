import React, {useEffect, useContext} from 'react';
import { Button, CircularProgress, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import NavBar from '../components/Navbar';
import CardContainer from '../components/CardContainer';
import Card from '../components/DeployCard';
import useDeployCards from '../hooks/useDeployCards';
import useDeploy from '../hooks/useDeploy';

import '../assets/pagesStyles.scss';
import { GlobalContext } from '../context/GlobalContext';
import { FilterContext } from '../context/FilterContext';

const useStyles = makeStyles({
  buttonLabel: {
    fontFamily: `'Open Sans'`,
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
    }
  },
  disabledRoot: {
    backgroundColor: '#F6F6F6',
  },
});

const Deploy = () => {

  const classes = useStyles();
  const { branch, availableTemplates, orgTemplates, pageLoading, setPageLoading } = useContext(GlobalContext);
  const { filterSource, setFilterSource, filterTexts } = useContext(FilterContext);
  let {getAvailableTemplates, getOrgTemplates} = useDeployCards();
  const {selectedTemplates, deployStatus, handleCardSelection, deployCards} = useDeploy();

  useEffect(() => {
    document.title = 'Lowtide | Deploy';
    if(pageLoading['available']===false){
      setPageLoading({...pageLoading, ['available']: true});
    }
    getAvailableTemplates();
  }, [branch]);

  useEffect(() => {
    getOrgTemplates();
    setPageLoading({...pageLoading, ['available']: true, ['org']: true});
  }, []);

  useEffect(()=>{
    if((!filterSource['available'] && !filterSource['org']) && (orgTemplates.length>0 || availableTemplates.length>0)){
      setFilterSource({...filterSource, ['org']: orgTemplates, ['available']: availableTemplates});
    }
    //setFilterSource({...filterSource, ['org']: orgTemplates, ['available']: availableTemplates});
    if(pageLoading['available'] && pageLoading['org']){
      setPageLoading({...pageLoading, ['available']: false, ['org']: false});
    }else if(pageLoading['available'] && !pageLoading['org']){
      setPageLoading({...pageLoading, ['available']: false, ['org']: true});
    }else if(!pageLoading['available'] && pageLoading['org']){
      setPageLoading({...pageLoading, ['available']: true, ['org']: false});
    }
  }, [orgTemplates]);

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
            {
              availableTemplates.length===0 ? 
                (filterTexts['available'] ? 
                  <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" textAlign="center" height="50vh">
                    No results found.
                  </Box> :
                  (
                    pageLoading['available'] ? <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="45vh" textAlign="center"><CircularProgress color="primary" style={{width:"35px", height:"35px"}}></CircularProgress></Box>
                    : 
                    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" textAlign="center" height="50vh">
                      No templates in repository.
                    </Box>
                  )
                )
              : availableTemplates.map((card, i) => (
                <Card
                  key={i}
                  type={'available'}
                  //startExpanded={i === 0}
                  //warning={i === 6}
                  data={{
                    name: card.label,
                    description: card.description,
                    tags: card.tags,
                    template_key: card.api_name,
                    dashboards: card.dashboards,
                    datasets: card.datasets,
                  }}
                  handleCardSelection={handleCardSelection}
                />
              ))
            }
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
            {deployStatus ? <CircularProgress thickness={7.5} color="primary" style={{width:"20px", height:"20px", float:'right'}}></CircularProgress> : 'Deploy'}
          </Button>

          <CardContainer
            type="org"
            styles={{ width: '30vw', height: '65vh' }}
            title="Your Org"
            searchPlaceholder="Search Templates"
          >
            {orgTemplates.length===0 ?
              (filterTexts['org'] ? 
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" textAlign="center" height="50vh">
                  No results found.
                </Box> :
                (
                  pageLoading['org'] ? <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="47.5vh" textAlign="center"><CircularProgress color="primary" style={{width:"35px", height:"35px"}}></CircularProgress></Box> 
                  : 
                  <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" textAlign="center" height="50vh">
                    No templates in your org.
                  </Box>
                )
              )
            : orgTemplates.map((card, i) => (
              <Card
                key={i}
                type={'org'}
                //startExpanded={i === 0}
                //warning={i === 6}
                data={{
                  name: card.label,
                  description: card.description,
                  tags: card.tags,
                  dashboards: card.dashboards,
                  datasets: card.csvDatasets,
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
