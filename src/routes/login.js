import React from 'react';
import { Paper, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import './login.scss';
import Illustration from '../assets/Charts.svg';
import SalesforceIcon from '../assets/salesforce1.svg';

import useLogin from '../hooks/useLogin';

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

const SOCKET_URL = 'https://ltapi.herokuapp.com/';
//const SOCKET_URL = 'http://localhost:8080/';

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
          Login to get the latest templates and timeshifting tool from the
          Salesforce EAPMM team!
        </p>
        <form
          className="login-screen__form"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <input
            className="login-screen__input"
            type="email"
            placeholder="Salesforce account"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login-screen__input"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button disabled={submitStatus} className="login-screen__submit">
            {submitStatus===true ? <CircularProgress color="secondary" style={{width:"16px", height:"16px", color: "white"}}></CircularProgress> : <div>Submit</div> }
          </button>
        </form>
        <div className="login-screen__or-text">or</div>
        <form
          className="login-screen__form"
          action={SOCKET_URL}
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
