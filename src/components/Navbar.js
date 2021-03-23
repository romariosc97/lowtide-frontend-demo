import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.scss';
import ddtIcon from '../assets/ddt_icon.png';
import SettingsDrawer from './SettingsDrawer';
import { SessionContext } from '../context/SessionContext';
import { GlobalContext } from '../context/GlobalContext';
import useLogin from '../hooks/useLogin';
import { FiberManualRecord } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  pending: {
    color: '#C23934',
    width: '10px',
    height: '10px',
  },
});

const Navbar = ({ activeTab }) => {
  const { sessionInfo } = useContext(SessionContext);
  const { jobsPending, setActionJobCounter } = useContext(GlobalContext);
  const {
    logout,
    logoutStatus
  } = useLogin();
  const classes = useStyles();
  useEffect(() => {
    let isMounted = false;
    if(!isMounted){
      if(activeTab!=='jobs'){
        setActionJobCounter(0);
      }
    }
    return () => { isMounted = true };
  }, []);
  return (
    <nav className="navBar">
      <div className="navBar__iconTitle">
        <img className="navBar__icon" src={ddtIcon} alt="Lowtide Icon" />
        <div className="navBar__title">Lowtide</div>
      </div>

      <div className="navBar__links">
        <Link to="/deploy">
          <div
            className={`navBar__link ${activeTab === 'deploy' ? 'active' : ''}`}
          >
            Deploy
          </div>
        </Link>
        <Link to="/timeshift">
          <div
            className={`navBar__link ${
              activeTab === 'timeshift' ? 'active' : ''
            }`}
          >
            Timeshift
          </div>
        </Link>
        <Link to="/jobs">
          <div
            className={`navBar__link ${activeTab === 'jobs' ? 'active' : ''}`}
          >
            Jobs {jobsPending ? <FiberManualRecord className={classes.pending}/> : ''}
          </div>
        </Link>
        <Link to="/about">
          <div
            className={`navBar__link ${activeTab === 'about' ? 'active' : ''}`}
          >
            About
          </div>
        </Link>
        {
          /*
            <Link to="/issuesBugs">
              <div
                className={`navBar__link ${activeTab === 'issuesBugs' ? 'active' : ''}`}
              >
                Issues & Bugs
              </div>
            </Link>
            <Link to="/people">
              <div
                className={`navBar__link ${activeTab === 'people' ? 'active' : ''}`}
              >
                People
              </div>
            </Link>
            <Link to="/resources">
              <div
                className={`navBar__link ${activeTab === 'resources' ? 'active' : ''}`}
              >
                Resources
              </div>
            </Link>
            <Link to="/faq">
              <div
                className={`navBar__link ${activeTab === 'faq' ? 'active' : ''}`}
              >
                FAQ
              </div>
            </Link>
          */
        }
      </div>

      <div className="navBar__status">
        <div className="navBar__user">
          Logged in as <a className="navBar__username" href={sessionInfo.instanceUrl} target="_blank" rel="noopener noreferrer">{sessionInfo.username}</a>
        </div>
        <button disabled={logoutStatus} type="button" onClick={logout} className={"unstyled-button navBar__logout" + (logoutStatus===true ? ' active' : '')}>Logout</button>
        <SettingsDrawer position="right" />
      </div>
    </nav>
  );
};

export default Navbar;
