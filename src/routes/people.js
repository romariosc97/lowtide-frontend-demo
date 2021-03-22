import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';
import {
  Box
} from '@material-ui/core/';
import useCardStyles from '../hooks/useCardStyles.js';

function People() {

  const [people, setQuestions] = useState([
    {id: 1, name: "Luc Iyer", email: 'luciyer@salesforce.com', type: 1},
    {id: 2, name: "Romario Sarmiento", email: 'rsarmiento@salesforce.com', type: 1},
    {id: 3, name: "Aditi Patel", email: 'aditi.patel@salesforce.com', type: 2},
    {id: 4, name: "Jayger McGough", email: 'jayger.mcgough@salesforce.com', type: 2},
    {id: 5, name: "Rodrigo Mercader", email: 'rmercader@salesforce.com', type: 2},
    {id: 6, name: "Juan Ferreira", email: 'jferreira@salesforce.com', type: 2}
  ]);

  const developers = people.filter((value) => value.type===1);
  const team = people.filter((value) => value.type===2);

  useEffect(() => {
    let isMounted = false;
    if(!isMounted){
      document.title = 'Lowtide | People';

    }
    return () => { isMounted = true };
  }, []);

  return (
    <div>
      <NavBar activeTab='people'/>
      <main className="main-wrapper">
        <h3 className="page-title">People</h3>
        <p className="page-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <div className="page-newContainer">
          <Box marginBottom="20px" className="developers">
            <h3>Developers</h3>
            {developers.map((v, i) => (
              <p key={i}>{v.name}<span>&#60;{v.email}&#62;</span></p>
            ))}
          </Box>
          <Box className="team-members">
            <h3>Team Members</h3>
            {team.map((v, i) => (
              <p key={i}>{v.name}<span>&#60;{v.email}&#62;</span></p>
            ))}
          </Box>
        </div>
      </main>
    </div>
  )
}

export default People
