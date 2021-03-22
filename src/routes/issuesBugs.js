import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';
import {
  Box,
  TextField,
  Button
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

function IssuesBugs() {

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

  const classes = useStyles();

  useEffect(() => {
    let isMounted = false;
    if(!isMounted){
      document.title = 'Lowtide | Issues & Bugs';

    }
    return () => { isMounted = true };
  }, []);

  return (
    <div>
      <NavBar activeTab='issuesBugs'/>
      <main className="main-wrapper">
        <h3 className="page-title">Issues & Bugs</h3>
        <p className="page-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <div className="page-newContainer">
          <Box marginBottom="20px" className="issues-bugs">
            <form action="">
              <div className="title">
                <h4>Contact Form</h4>
              </div>
              <div className="fields">
                <TextField margin="normal" className="half" label="Name" variant="outlined" />
                <TextField margin="normal" className="half" label="Email" variant="outlined" />
              </div>
              <div className="text-area">
                <TextField margin="normal" fullWidth label="Description" variant="outlined" multiline rows="4" />
              </div>
              <div className="actions">
                <Button
                  classes={{
                  root: classes.buttonRoot,
                  label: classes.buttonLabel,
                  disabled: classes.disabledRoot,
                  }}
                >
                  Enviar
                </Button>
              </div>
            </form>
          </Box>
        </div>
      </main>
    </div>
  )
}

export default IssuesBugs
