import React, { useEffect, useContext } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core/';
import clsx from 'clsx';
import { Button} from '@material-ui/core';
import { ExpandMore, Delete } from '@material-ui/icons';

import './Card.scss';
import useAccordionStyles from '../hooks/useAccordionStyles.js';
import useCardStyles from '../hooks/useCardStyles.js';

import useTimeshiftOrgCard from '../hooks/useTimeshiftOrgCard';
import { GlobalContext } from '../context/GlobalContext';

const Card = ({
  data,
}) => {  
  const { deleteOrgDataset, handleOrgExpanded } = useTimeshiftOrgCard();
  const classescard = useCardStyles();
  const classesaccordion = useAccordionStyles();
  const { orgFolders, orgExpanded, setOrgExpanded } = useContext(GlobalContext);

  // Add card to selected cards array.
  /* useEffect(() => {
    let isMounted = false;
    if(!isMounted){
      let tmp = {};
      for (let i = 0; i < orgFolders.length; i++) {
        tmp = {...tmp, [orgFolders[i].Id]: false};
      }
      setOrgExpanded(tmp);
    }
    return () => { isMounted = true };
  }, [orgFolders]);
 */
  return (
    <Accordion
      //defaultExpanded={startExpanded}
      TransitionProps={{ unmountOnExit: true }}
      classes={{
        root: classescard.root,
        expanded: classescard.expanded,
      }}
      expanded={orgExpanded[data.id]}
      onClick={() => handleOrgExpanded(data.id)}
    >
      <AccordionSummary
        expandIcon={<ExpandMore className={classescard.arrow} />}
        id="card-header"
        className={clsx(classescard.header, {
          [classescard.selected]: false,
          [classescard.warning]: false,
        })}
        classes={{
          root: classescard.summaryRoot,
          content: classescard.summaryContent,
          expanded: classescard.expanded,
        }}
      >
        <div className="card-header__leftArea">
          {data.name}
        </div>
        <div className="card-header__rightArea">

          {/* <IconButton className={classesaccordion.deleteIconButton} aria-label="Delete" onClick={deleteOrgDataset}>
            <Delete />
          </IconButton> */}

        </div>
      </AccordionSummary>

      <AccordionDetails
        classes={{
          root: classescard.detailsRoot,
        }}
      >
        <div className="cardContent">
          <div className="cardContent__description">
            <p><strong className="blue">Developer Name:</strong> {data.developer}</p>
            <p><strong className="blue">Type:</strong> {data.type}</p>
            <p><strong className="blue">Data Flow Type:</strong> {`${data.dataFlowType}`}</p>
            <p><strong className="blue">Created Date:</strong> {data.createdDate}</p>
          </div>
          <div className="cardContent__actions">
            <Button className={classesaccordion.deleteButton} variant="contained" color="secondary" onClick={() => deleteOrgDataset(data.id)}>
              <Delete /> Delete
            </Button>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default Card;