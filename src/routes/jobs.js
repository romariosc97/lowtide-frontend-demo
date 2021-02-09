import React, {Fragment, useEffect, useContext} from 'react'
import NavBar from '../components/Navbar'
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
            row.result = socketAux.result;
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
        <span className={classes.status}><b>Status:</b> {jobUpdates[id] || 'Loading'}</span>
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
            {Object.keys(expanded).length>0 ? jobs.map((card, i) => (
              <Grid key={i} item xs={4}>
                <Card className={classes.root} variant="outlined">
                  <CardContent className={classes.content}>
                    <p className={classes.muted}>
                      ID: {card.job_id}
                    </p>
                    <h3 className={classes.title}>
                      {card.job_name}
                    </h3>
                    <p className={classes.muted}>
                      {card.run_at}
                    </p>
                    <div className={classes.templates}>
                      {jobDetail[i] !== undefined ? ( jobDetail[i].result ? 
                      ( card.job_name === "Deploy Operation" ?
                      card.job_details.templates.map((template, ia) => (
                          <Fragment key={ia}>
                            <Accordion className={classes.accordion} expanded={expanded[`panel${+i}-${ia}`]} onChange={() => handleChange(`panel${+i}-${ia}`)}>
                              <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls={`panel${+i}-${ia}bh-content`}
                                id={`panel${+i}-${ia}bh-header`}
                                className={classes.accordionSummary}
                              >
                                <p className={classes.heading}><b>{template}</b>{jobDetail[i].result[ia].status==='rejected' ?
                                <ErrorOutline className={classes.errorOutline}/> : jobDetail[i].result[ia].value.status === 'Succeeded' ? <Check className={classes.headingCheck}/> : <Close className={classes.headingClose}/>}</p>
                              </AccordionSummary>
                              <AccordionDetails>
                                <div className={classes.accordionBody} key={ia}>
                                  {jobDetail[i].result[ia].status === 'rejected' ?
                                      <p>{jobDetail[i].result[ia].reason}</p>
                                    
                                  :
                                    <Fragment>
                                      <p>Status: <b>{jobDetail[i].result[ia].value.status}</b></p>
                                      <p>Total components: <b>{jobDetail[i].result[ia].value.numberComponentsTotal}</b></p>
                                      <p>Deployed components: <b>{jobDetail[i].result[ia].value.numberComponentsDeployed}</b></p>
                                      <p>Failed components: <b>{jobDetail[i].result[ia].value.numberComponentErrors}</b></p>
                                    </Fragment>
                                  }
                                </div> 
                              </AccordionDetails>
                            </Accordion>
                          </Fragment>
                      ))
                      : (
                        jobDetail[i].result.success===false ? <p><b>Error message: </b><br/>{jobDetail[i].result.message}</p> 
                        : 
                          <Fragment>
                            <Accordion className={classes.accordion} expanded={expanded[`panel-timeshift-${+i}-df1`]} onChange={() => handleChange(`panel-timeshift-${+i}-df1`)}>
                              <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls={`panel-timeshift-${+i}-df1bh-content`}
                                id={`panel-timeshift-${+i}-df1bh-header`}
                                className={classes.accordionSummary}
                              >
                                <p className={classes.heading}><b>{jobDetail[i].result.ongoingDataflow.tsLabel}</b></p>
                              </AccordionSummary>
                              <AccordionDetails>
                                <div className={classes.accordionBody}>
                                  
                                </div> 
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion} expanded={expanded[`panel-timeshift-${+i}-df2`]} onChange={() => handleChange(`panel-timeshift-${+i}-df2`)}>
                              <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls={`panel-timeshift-${+i}-df2bh-content`}
                                id={`panel-timeshift-${+i}-${jobDetail[i].id}bh-header`}
                                className={classes.accordionSummary}
                              >
                                <p className={classes.heading}><b>{jobDetail[i].result.primerDataflow.tsLabel}</b></p>
                              </AccordionSummary>
                              <AccordionDetails>
                                <div className={classes.accordionBody}>
                                  
                                </div> 
                              </AccordionDetails>
                            </Accordion>
                          </Fragment>
                        ) ) 
                      : pending(/* jobDetail[i] !== undefined ? jobDetail[i].id : 0 */card.job_id) ) : 
                        pending(/* jobDetail[i] !== undefined ? jobDetail[i].id : 0 */card.job_id)
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
