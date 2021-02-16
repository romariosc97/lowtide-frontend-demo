import React, { useEffect, useState, useContext, Fragment } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core/';
import clsx from 'clsx';
import { CircularProgress, Box } from '@material-ui/core';
import { ExpandMore, Equalizer, ViewQuilt } from '@material-ui/icons';

import Checkbox from './Checkbox';
import Tag from './Tag';

import './Card.scss';
import useCardStyles from '../hooks/useCardStyles';

import { FilterContext } from '../context/FilterContext';
import { GlobalContext } from '../context/GlobalContext';

const Card = ({
  type,
  startExpanded,
  warning,
  data,
  handleCardSelection,
}) => {  
  const { selectedTemplates } = useContext(FilterContext);
  const { deploying, templatesDeployed } = useContext(GlobalContext);
  const [selected, setSelected] = useState(selectedTemplates.indexOf(data.template_key)!==-1);
  const [loading, setLoading] = useState();
  const classes = useCardStyles();


  // Add card to selected cards array.
  useEffect(() => {
    let isMounted = false;
    if(!isMounted){
      if (type === 'available'){
        handleCardSelection(data.template_key, selected);
        if(deploying.indexOf(data.template_key)!==-1 && selected){
          setLoading(true);
          setSelected(false);
        }
        //console.log(selected, 'DeployCard', data)
      }
    }
    return () => { isMounted = true };
  }, [selected, deploying]);

  useEffect(() => {
    if(templatesDeployed.indexOf(data.template_key)!==-1){
      setLoading(false);
    }
  }, [templatesDeployed]);

  return (
    <Accordion
      defaultExpanded={startExpanded}
      TransitionProps={{ unmountOnExit: true }}
      classes={{
        root: classes.root,
        expanded: classes.expanded,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore className={classes.arrow} />}
        id="card-header"
        className={clsx(classes.header, {
          [classes.selected]: type === 'available' && selected,
          [classes.warning]: (type === 'org' && warning) || loading,
        })}
        classes={{
          root: classes.summaryRoot,
          content: classes.summaryContent,
          expanded: classes.expanded,
        }}
      >
        <div className="card-header__leftArea">
          {type === 'available' ? (
            (loading ? <CircularProgress thickness={7.5} style={{color: 'white', width:"20px", height:"20px", marginRight: "12px"}}></CircularProgress> : <Checkbox template_key={data.template_key} selected={selected} setParentSelected={setSelected} />)
          ) : null}
          <div className="summaryBody__title"><span>{data.name}</span></div>
        </div>
        <div className="card-header__rightArea"></div>
      </AccordionSummary>

      <AccordionDetails
        classes={{
          root: classes.detailsRoot
        }}
        className={loading ? classes.loadingCard : ''}
      >
        <div className="cardContent">
          <div className="cardContent__body">
            <div  className="cardContent__body__subtitle">
              Description
            </div>
            <div  className="cardContent__body__content">
              {data.description || 'No description provided.'}
            </div>
            <div  className="cardContent__body__subtitle">
              Dashboards
            </div>
            <div  className="cardContent__body__content">
              <Box flexWrap="wrap" display="flex">
                {
                  data.dashboards.map((value, i) => (
                    <Box key={i} display="flex" alignItems="center">
                      <Equalizer></Equalizer> {value}
                    </Box>
                  ))
                }
              </Box>
            </div>
            <div  className="cardContent__body__subtitle">
              Datasets
            </div>
            <div  className="cardContent__body__content">
              <Box flexWrap="wrap" display="flex">
                {
                  data.datasets.map((value, i) => (
                    <Box key={i} display="flex" alignItems="center">
                      <ViewQuilt></ViewQuilt> {value}
                    </Box>
                  ))
                }
              </Box>
            </div>
            {
              data.tags ? data.tags.length > 0 ? 
              <Fragment>
                <div  className="cardContent__body__subtitle">
                  Tags
                </div>
                {
                  (
                    <div className="cardContent__tags">
                      {data.tags &&
                        data.tags.map((tag) => (
                          <Tag key={`key-${tag}`} label={tag} selected />
                        ))}
                    </div>
                  )
                } 
              </Fragment>
              : ''
              : ''
            }
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default Card;
