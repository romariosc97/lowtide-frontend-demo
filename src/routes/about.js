import React, { useEffect } from 'react';
import NavBar from '../components/Navbar';
import { Grid } from '@material-ui/core';

function About() {

  useEffect(() => {
    let isMounted = false;
    if(!isMounted){
      document.title = 'Lowtide | About';

    }
    return () => { isMounted = true };
  }, []);

  return (
    <div>
      <NavBar activeTab='about'/>
      <main className="main-wrapper">
        <h3 className="page-title">About</h3>
        <p className="page-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <div className="page-mainContainer">
          
        </div>
      </main>
    </div>
  )
}

export default About
