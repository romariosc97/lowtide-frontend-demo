import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@material-ui/core/';
import { Close } from '@material-ui/icons';
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
    closeButton: {
        position: 'absolute',
        right: '8px',
        top: '50%',
        transform: 'translateY(-50%)'
    },
  });

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let isMounted = false;
    if(!isMounted){

    }
    return () => { isMounted = true };
  }, []);

  return (
    <div>
        <h3 className="page-title">Issues & Bugs</h3>
        <p className="page-description">
            <a className="issues-bugs-link" onClick={handleClickOpen}>
                Log an issue or bug
            </a>
        </p>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} className="issues-bugs">
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Contact Form
                <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers className="form">
                <TextField fullWidth label="Name" variant="outlined" size="small"/>
                <TextField fullWidth label="Email" variant="outlined" size="small"/>
                <TextField fullWidth label="Description" variant="outlined" multiline rows="6" />
            </DialogContent>
            <DialogActions>
                <Button
                    autoFocus 
                    onClick={handleClose}
                    classes={{
                    root: classes.buttonRoot,
                    label: classes.buttonLabel,
                    disabled: classes.disabledRoot,
                    }}
                    type="submit"
                >
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default IssuesBugs