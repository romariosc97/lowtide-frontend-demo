import React, {Fragment, useEffect, useContext} from 'react';
import NavBar from '../components/Navbar';
import { Card, CardContent, CardActions, Accordion, AccordionDetails, AccordionSummary, Grid, CircularProgress, LinearProgress, Box } from '@material-ui/core';
import { ExpandMore, Check, Close, BusinessCenter, ErrorOutline } from '@material-ui/icons';
import useAccordionStyles from '../hooks/useAccordionStyles.js';
import useJobs from '../hooks/useJobs';

import { GlobalContext } from '../context/GlobalContext';

function Jobs() {

  const classes = useAccordionStyles();
  const {jobs, getSessionJobs, expanded, setExpanded, jobStatus} = useJobs();
  const { setJobsPending, jobDetail, setJobDetail, jobUpdates, socketAux } = useContext(GlobalContext);

  const handleChange = (i) => {
    setExpanded({
      ...expanded,
      [i]: expanded[i] ? false : true
    });
  };
  useEffect(() => {
    let isMounted = false;
    if(!isMounted){
      document.title = 'Lowtide | Jobs';
      setJobsPending(false);
      getSessionJobs();
    }
    return () => { isMounted = true };
  }, []);

  useEffect(() => {
    let isMounted = false;
    if(!isMounted){
      if(Object.keys(socketAux).length > 0){
        let passTmp = false;
        let jobDetailTmp = jobDetail.map((row, i) => {
          if(row.id === socketAux.id){
            row.returnvalue = {result: {deployResult: socketAux.result}, status: socketAux.status};
            passTmp = true;
          }
          return row;
        });
        if(!passTmp){
          jobDetailTmp.push({id: socketAux.id, result: socketAux.result});
        }
        setJobDetail(jobDetailTmp);
      }
    }
    return () => { isMounted = true };
  }, [socketAux]);

  const pending = (id) => (
    <Fragment>
      <Box width='100%' display="flex" justifyContent="center" alignItems="center" flexDirection="column" minHeight="200px" textAlign="center">
        <span className={classes.pendingTitle}>This job is pending.</span>
        <LinearProgress className={classes.linearProgress} />
        <span className={classes.status}><b>Status:</b> {jobUpdates[id] || 'Queued'}</span>
      </Box>
    </Fragment>
  );

  return (
    <div>
      <NavBar activeTab='jobs'/>
      <main className="main-wrapper">
        <h3 className="page-title">Pending Jobs</h3>
        <p className="page-description">
          You can track your deployment status.
        </p>
        <div className="page-mainContainer">
          <Grid container spacing={3} className={classes.grid}>
            {Object.keys(expanded).length>0 ? jobDetail.map((card, i) => (
              <Grid key={i} item xs={4}>
                <Card className={classes.root} variant="outlined">
                  <CardContent className={classes.content}>
                    <p className={classes.muted}>
                      ID: {card.id}
                    </p>
                    <h3 className={classes.title}>
                      {card.name==='template_deploy' ? 'Deploy' : 'Timeshift'}
                    </h3>
                    <p className={classes.muted}>
                      {card.processedOn}
                    </p>
                    <div className={classes.templates}>
                      {jobDetail[i] !== undefined ? ( jobDetail[i].returnvalue ? 
                        <Fragment>
                          <p>Status: <b>{jobDetail[i].returnvalue.status}</b></p>
                          <p>Total components: <b>{jobDetail[i].returnvalue.result.deployResult.numberComponentsTotal}</b></p>
                          <p>Deployed components: <b>{jobDetail[i].returnvalue.result.deployResult.numberComponentsDeployed}</b></p>
                          <p>Failed components: <b>{jobDetail[i].returnvalue.result.deployResult.numberComponentErrors}</b></p>
                          {jobDetail[i].finishedOn ? <p>Finished on: <b>{jobDetail[i].finishedOn}</b></p> : ''}
                        </Fragment>
                      : pending(/* jobDetail[i] !== undefined ? jobDetail[i].id : 0 */card.id) ) : 
                        pending(/* jobDetail[i] !== undefined ? jobDetail[i].id : 0 */card.id)
                      }
                    </div>
                  </CardContent>
                  <CardActions>
                    
                  </CardActions>
                </Card>
              </Grid>
            )) : (jobStatus) ?
            <Box width='100%' display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="50vh" textAlign="center"><CircularProgress color="primary" style={{width:"40px", height:"40px"}}></CircularProgress></Box> : 
            <Fragment>
              <div className={classes.noJobs}>
                <h3>There are no pending jobs.</h3>
                <BusinessCenter className={classes.noJobsIcon}/>
              </div>
            </Fragment>
            }
          </Grid>
        </div>
      </main>
    </div>
  )
}

export default Jobs
