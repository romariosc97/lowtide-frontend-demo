/*
SERVER: 
"start": "node server/index.js",

LOCAL:  
"start": "react-scripts start",

*/

const API_URL = 'https://ltapi.herokuapp.com/api';
//const API_URL = 'http://localhost:8080/api';

const SOCKET_URL = 'https://ltapi.herokuapp.com/';
//const SOCKET_URL = 'http://localhost:8080/';

const SNACKBAR_DEFAULT = {
    autoHideDuration: 6000,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right',
    }
  };

export {
    API_URL, SOCKET_URL, SNACKBAR_DEFAULT
}