import React, {Fragment, useEffect, useContext} from 'react'
import NavBar from '../components/Navbar'
import { Card, CardContent, CardActions, Accordion, AccordionDetails, AccordionSummary, Grid, CircularProgress, LinearProgress, Box } from '@material-ui/core';
import { ExpandMore, Check, Close, BusinessCenter, ErrorOutline } from '@material-ui/icons';
import useAccordionStyles from '../hooks/useAccordionStyles.js';
import useJobs from '../hooks/useJobs';
import io from "socket.io-client";
import { GlobalContext } from '../context/GlobalContext';
import { SOCKET_URL } from '../config/configuration';

function Jobs() {

  const socket = io(SOCKET_URL, {transports: ['websocket', 'polling', 'flashsocket']});
  const classes = useAccordionStyles();
  const {jobs, getSessionJobs, expanded, setExpanded, jobStatus} = useJobs();
  const { setJobsPending, jobDetail, setJobDetail, setDeploying, setJobsDeployed, deploying, jobsDeployed, actionJobCounter, setActionJobCounter } = useContext(GlobalContext);

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
      if(actionJobCounter===0){
        getSessionJobs();
        setActionJobCounter(actionJobCounter+1);
      }else{
        socket.emit("subscribeToJobUpdates");
        socket.on("jobEnded", data => {
          let deployingTmp = [];
          for (let i = 0; i < deploying.length; i++) {
            if(data.template_keys.indexOf(deploying[i])===-1){
              deployingTmp.push(deploying[i]);
            }
          }
          setDeploying(deployingTmp);
          setJobsDeployed([...jobsDeployed, data.id]);
          
          let passTmp = false;
          let jobDetailTmp = jobDetail.map((row, i) => {
            if(row.id === data.id){
              row.result = data.result;
              passTmp = true;
            }
            return row;
          });
          if(!passTmp){
            jobDetailTmp.push({id: data.id, result: data.result});
          }
          setJobDetail(jobDetailTmp);
        });
      }
    }
    return () => { isMounted = true };
  }, [actionJobCounter]);

  const pending = (
    <Fragment>
      <Box width='100%' display="flex" justifyContent="center" alignItems="center" flexDirection="column" minHeight="200px" textAlign="center">
        <span className={classes.pendingTitle}>This job is pending.</span>
        <LinearProgress className={classes.linearProgress} />
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
                      {jobDetail[i] !== undefined ? ( jobDetail[i].result ? card.job_details.templates.map((template, ia) => (
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
                                {/*<Typography className={classes.secondaryHeading}>I am an accordion</Typography>*/}
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
                      )) : pending ) : 
                        pending
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
