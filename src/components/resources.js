import React, { useEffect, useState } from 'react';
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

    }
    return () => { isMounted = true };
  }, []);

  return (
    <div>
      <h3 className="page-title">More Resources</h3>
      <div className="page-newContainer">
        <Box marginBottom="20px" className="resources">
          {resources.map((v, i) => (
            <div>
              <a href={v.url} target="_blank" rel="noopener noreferrer">{v.name}</a>
            </div>
          ))}
        </Box>
      </div>
    </div>
  )
}

export default Resources
