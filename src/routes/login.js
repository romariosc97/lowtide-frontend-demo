import React, {Fragment} from 'react';
import { Paper, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import './login.scss';
import Illustration from '../assets/Charts.svg';
import SalesforceIcon from '../assets/salesforce1.svg';
import { Send } from '@material-ui/icons';

import useLogin from '../hooks/useLogin';
import { API_URL } from '../config/configuration';

const useStyles = makeStyles({
  paperRoot: {
    zIndex: 1,
    marginLeft: '7rem',
    backgroundColor: '#F6F6F6',
    width: '30vw',
    borderRadius: '10px',
    padding: '4rem',
    display: 'flex',
    flexDirection: 'column',
  },
});

const Login = () => {
  const classes = useStyles();
  const {
    email,
    password,
    formRef,
    submitStatus,
    setEmail,
    setPassword,
    handleSubmit
  } = useLogin();

  return (
    <div className="login-screen">
      <img
        src={Illustration}
        alt="Illustration"
        className="background-illustration"
      />
      <Paper
        elevation={3}
        classes={{
          root: classes.paperRoot,
        }}
      >
        <h2 className="login-screen__title">
          Login to your <span className="blue">Salesforce Org</span>
        </h2>
        <p className="login-screen__description">
          Establish a connection with your Salesforce Org to deploy analytics app templates and timeshift datasets. Brought to you by the TCRMPMM squad.
        </p>
        <form
          className="login-screen__form"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <input
            className="login-screen__input"
            type="email"
            placeholder="username@mydemo.org"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login-screen__input"
            type="password"
            placeholder=""
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button disabled={submitStatus} className="login-screen__submit">
            {submitStatus===true ? <CircularProgress color="secondary" style={{width:"16px", height:"16px", color: "white"}}></CircularProgress> : <Fragment><Send/> <span>Submit</span></Fragment> }
          </button>
        </form>
        <div className="login-screen__or-text">or</div>
        <form
          className="login-screen__form"
          action={`${API_URL}/auth/oauth`}
          method="GET"
        >
          <button className="login-screen__salesforce">
            <img
              src={SalesforceIcon}
              alt="Salesforce Icon"
              className="salesforce-icon"
            />
            Salesforce Oauth
          </button>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
