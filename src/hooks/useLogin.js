import { useRef, useState, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { SessionContext } from '../context/SessionContext';
import { API_URL } from '../config/configuration'

const useLogin = () => {
  // axios.defaults.withCredentials = true;
  const { setIsLoggedIn, setLoginAction, loginAction } = useContext(SessionContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitStatus, setSubmitStatus] = useState(false);
  const [logoutStatus, setLogoutStatus] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from refreshing.

    // Since preventDefault stops form validation, we need to programatically run it
    if (!formRef.current.checkValidity())
      return formRef.current.reportValidity();

    try {
      // const response = await axios.get('https://lowtide.herokuapp.com/');
      // console.log(response);
      setSubmitStatus(true);
      const loginAxios = axios.create({
        withCredentials: true,
      });
      const response = await loginAxios.post(`${API_URL}/auth/login`, {  
        username: email,
        password: password,
      });

      if (response.status === 200) {
        //console.log({ response });
        console.log('cookie', Cookies.get());
        setLoginAction(loginAction+1)
        return setIsLoggedIn(true);
      }
    } catch (error) {
      console.log({ error });
      setSubmitStatus(false);
      alert(error);
    }
  };

  const logout = async (e) => {
    try {
      setLogoutStatus(true);
      const loginAxios = axios.create({
        withCredentials: true,
      });
      await loginAxios.get(`${API_URL}/auth/revoke`);
      return setIsLoggedIn(false);
    } catch (error) {
      setLogoutStatus(false);
      console.error(error.message);
    }
  };

  return { email, password, formRef, submitStatus, logoutStatus, setEmail, setPassword, handleSubmit, setSubmitStatus, logout };
};

export default useLogin;
