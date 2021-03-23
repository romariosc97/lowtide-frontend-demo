import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core/';
import clsx from 'clsx';
import useCardStyles from '../hooks/useCardStyles.js';
import { ExpandMore } from '@material-ui/icons';

function Faq() {

  const [orgExpanded, setOrgExpanded] = useState({});
  const [questions, setQuestions] = useState([
    {id: 1, name: 'What is Lorem Ipsum?', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
    {id: 2, name: 'Where does it come from?', description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`},
    {id: 3, name: 'Where can I get some?', description: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`}
  ]);

  const classescard = useCardStyles();
  useEffect(() => {
    let isMounted = false;
    if(!isMounted){

    }
    return () => { isMounted = true };
  }, []);

  const handleOrgExpanded = (id) => {
    setOrgExpanded({
      ...orgExpanded,
      [id]: orgExpanded[id] ? false : true
    });
  };

  return (
    <div>
      <h3 className="page-title">FAQ</h3>
      <div className="page-newContainer">
        {questions.map((v, i) => (
          <Accordion
            key={i}
            //defaultExpanded={startExpanded}
            TransitionProps={{ unmountOnExit: true }}
            classes={{
              root: classescard.root,
              expanded: '',
            }}
            expanded={ v.id in orgExpanded ? orgExpanded[v.id] : false }
            onClick={() => handleOrgExpanded(v.id)}
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
                expanded: '',
              }}
            >
              <div className="card-header__leftArea">
                {v.name}
              </div>
              <div className="card-header__rightArea">

              </div>
            </AccordionSummary>

            <AccordionDetails
              classes={{
                root: classescard.detailsRoot,
              }}
            >
              <div className="cardContent">
                <div className="cardContent__description">
                  {v.description}
                </div>
                <div className="cardContent__actions">
                  
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  )
}

export default Faq
