import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';
import {
  Box
} from '@material-ui/core/';

function Resources() {

  const [resources, setResources] = useState([
    {id: 1, name: "Lowtide API", url: 'https://lt4.herokuapp.com/'},
    {id: 2, name: "Highspot", url: 'https://wwww.highspot.com'},
    {id: 3, name: "Demo Data Tool", url: 'https://www.demo-data-tool.com'},
    {id: 4, name: "Insights Designer", url: 'https://www.insight-designer.com'},
  ]);

  useEffect(() => {
    let isMounted = false;
    if(!isMounted){
      document.title = 'Lowtide | Resources';

    }
    return () => { isMounted = true };
  }, []);

  return (
    <div>
      <NavBar activeTab='resources'/>
      <main className="main-wrapper">
        <h3 className="page-title">More Resources</h3>
        <p className="page-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <div className="page-newContainer">
          <Box marginBottom="20px" className="resources">
            {resources.map((v, i) => (
              <div>
                <a href={v.url} target="_blank" rel="noopener noreferrer">{v.name}</a>
              </div>
            ))}
          </Box>
        </div>
      </main>
    </div>
  )
}

export default Resources
