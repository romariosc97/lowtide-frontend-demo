import React, { useEffect, useState } from 'react';
import {
  Box
} from '@material-ui/core/';

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

    }
    return () => { isMounted = true };
  }, []);

  return (
    <div>
      <h3 className="page-title">People</h3>
      <div className="page-newContainer">
        <Box marginBottom="16px" className="developers">
          <h4>Developers</h4>
          {developers.map((v, i) => (
            <p key={i}>{v.name}<span>&#60;{v.email}&#62;</span></p>
          ))}
        </Box>
        <Box className="team-members">
          <h4>Team Members</h4>
          {team.map((v, i) => (
            <p key={i}>{v.name}<span>&#60;{v.email}&#62;</span></p>
          ))}
        </Box>
      </div>
    </div>
  )
}

export default People
