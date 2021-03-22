import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import Login from './routes/login';
import Deploy from './routes/deploy';
import Timeshift from './routes/timeshift';
import Jobs from './routes/jobs';
import About from './routes/about';
import Faq from './routes/faq';
import People from './routes/people';
import Resources from './routes/resources';
import IssuesBugs from './routes/issuesBugs';
import { FilterContextProvider } from './context/FilterContext';
import { SessionContext } from './context/SessionContext';
import LoadingScreen from './components/LoadingScreen';

const App = () => {
  const { isLoggedIn } = useContext(SessionContext);
  return (
    <Router>
      <Switch>
          <Route exact path="/">
            {(isLoggedIn===null) ? <LoadingScreen></LoadingScreen> : (isLoggedIn ? <Redirect to="/deploy" /> : <Redirect to="/login" />)}
          </Route>
          <Route path="/login">
            {(isLoggedIn===null) ? <LoadingScreen></LoadingScreen> : (isLoggedIn) ? <Redirect to="/deploy" /> : <Login />}
          </Route>
          <Route path="/deploy">
            {(isLoggedIn===null) ? <LoadingScreen></LoadingScreen> : (isLoggedIn) ? (
              <FilterContextProvider>
                <Deploy />
              </FilterContextProvider>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/timeshift">
            {(isLoggedIn===null) ? <LoadingScreen></LoadingScreen> : (isLoggedIn) ?
            <FilterContextProvider>
              <Timeshift /> 
            </FilterContextProvider>
            : <Redirect to="/login" />}
          </Route>
          <Route path="/jobs">
            {(isLoggedIn==null) ? <LoadingScreen></LoadingScreen> : (isLoggedIn) ? <Jobs /> : <Redirect to="/login" />}
          </Route>
          <Route path="/about">
            {(isLoggedIn==null) ? <LoadingScreen></LoadingScreen> : (isLoggedIn) ? <About /> : <Redirect to="/login" />}
          </Route>
          <Route path="/faq">
            {(isLoggedIn==null) ? <LoadingScreen></LoadingScreen> : (isLoggedIn) ? <Faq /> : <Redirect to="/login" />}
          </Route>
          <Route path="/people">
            {(isLoggedIn==null) ? <LoadingScreen></LoadingScreen> : (isLoggedIn) ? <People /> : <Redirect to="/login" />}
          </Route>
          <Route path="/resources">
            {(isLoggedIn==null) ? <LoadingScreen></LoadingScreen> : (isLoggedIn) ? <Resources /> : <Redirect to="/login" />}
          </Route>
          <Route path="/issuesBugs">
            {(isLoggedIn==null) ? <LoadingScreen></LoadingScreen> : (isLoggedIn) ? <IssuesBugs /> : <Redirect to="/login" />}
          </Route>
      </Switch>
    </Router>
  );
};

export default App;
