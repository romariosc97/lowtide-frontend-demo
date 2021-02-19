import React, { useEffect, useState, useContext, Fragment } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core/';
import clsx from 'clsx';
import { CircularProgress, Box } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

import Checkbox from './TimeshiftCheckbox';

import './Card.scss';
import useAccordionStyles from '../hooks/useAccordionStyles.js';
import useCardStyles from '../hooks/useCardStyles.js';

import { GlobalContext } from '../context/GlobalContext';
import useTimeshift from '../hooks/useTimeshift';

const Card = ({
  data,
  handleCardSelection,
  handleCardCollapse
}) => {  
  const { timeshifting, selectedDatasets, datasets } = useContext(GlobalContext);
  const {expanded, setExpanded} = useTimeshift();
  const [selected, setSelected] = useState(false);
  const [loading/*, setLoading*/] = useState(false);
  const classescard = useCardStyles();
  const classesaccordion = useAccordionStyles();

  useEffect(() => {
    let isMounted = false;
    if(!isMounted){
      handleCardSelection(data.id, selected);
      if(timeshifting.indexOf(data.id)!==-1 && selected){
        setSelected(false);
        //setLoading(true);
      }
    }
    return () => { isMounted = true };
  }, []);

  const handleChange = (i) => {
    console.log(expanded);
    setExpanded({
      ...expanded,
      [i]: expanded[i] ? false : true
    });
  };

  return (
    <Accordion
      TransitionProps={{ unmountOnExit: true }}
      classes={{
        root: classescard.root,
        expanded: classescard.expanded,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore className={classescard.arrow} />}
        id="card-header"
        className={clsx(classescard.header, {
          [classescard.selected]: selected,
          [classescard.warning]: loading,
        })}
        classes={{
          root: classescard.summaryRoot,
          content: classescard.summaryContent,
          expanded: classescard.expanded,
        }}
        onClick={() => {handleCardCollapse(data.id)}}
      >
        <div className="card-header__leftArea">
          <Checkbox id={data.id} selected={selected} children={datasets[data.id]} developerName={data.developer} name={data.name}/>
          <div className="summaryBody__title"><span>{data.name}</span>{(timeshifting.indexOf(data.id)!==-1 ? <CircularProgress color="primary" style={{width:"20px", height:"20px", float:'right'}}></CircularProgress> : '')}</div>
        </div>
        <div className="card-header__rightArea"></div>
      </AccordionSummary>

      <AccordionDetails
        classes={{
          root: classescard.detailsRoot,
        }}
      >
        <div className="cardContent">              
          <div className="cardContent__heading">
            <div className="cardContent__author">
              <strong className="blue">Developer Name:</strong> {data.developer}
            </div>
            <div className="cardContent__version">
              <strong className="blue">Type:</strong> {'Folder'}
            </div>
          </div>
          <div className="cardContent__description">
            <p className="blue"><b>Datasets:</b></p>
            <br/>
            {
              (data.id in datasets) ? 
              <Fragment>
                {datasets[data.id].map((folder, ia) => (
                <Accordion key={ia} className={classesaccordion.accordion} expanded={expanded[`panel${+data.i}-${ia}`]} onChange={() => handleChange(`panel${+data.i}-${ia}`)}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls={`panel${+data.i}-${ia}bh-content`}
                    id={`panel${+data.i}-${ia}bh-header`}
                    className={`${classesaccordion.accordionSummary} ${classesaccordion.accordionGray}`}
                  >
                    <Checkbox id={folder.Id} parentId={data.id} selected={selectedDatasets.indexOf(folder.Id)!==-1} developerName={data.developer} name={data.name}/><p className={classesaccordion.heading}><b>{folder.MasterLabel}</b></p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className={classesaccordion.accordionBody} key={ia}>
                      <Fragment>
                        <p>Type: <b>{folder.attributes.type}</b></p>
                        <p>Language: <b>{folder.Language}</b></p>
                        <p>URL: <b>{folder.attributes.url}</b></p>
                      </Fragment>
                    </div>
                  </AccordionDetails>
                </Accordion>
                ))}
              </Fragment> : 
              <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" minHeight="46px" textAlign="center"><CircularProgress color="primary" style={{width:"25px", height:"25px"}}></CircularProgress></Box>
            }
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default Card;