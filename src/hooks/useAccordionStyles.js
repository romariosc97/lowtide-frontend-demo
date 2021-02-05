import { makeStyles } from '@material-ui/core/styles';

const useAccordionStyles = makeStyles({
  root: {
    minWidth: 275,
    background: '#FBFBFB'
  },
  content:{
    minHeight: 300
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  muted: {
    fontSize: 14,
    color: '#606060'
  },
  title: {
    marginBottom: '0.5rem',
    marginTop: '0.5rem'
  },
  accordion: {
    width:'100%'
  },
  accordionBody: {
    fontSize: '0.85rem',
    wordBreak: 'break-all'
  },
  accordionSummary: {
    wordBreak: 'break-word'
  },
  grid: {
    paddingBottom: '2rem'
  },
  heading: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: '0.85rem'
  },
  headingCheck: {
    color: '#4caf50'
  },
  headingClose: {
    color: 'rgb(220, 0, 78)'
  },
  errorOutline: {
    color: '#ff9800'
  },
  templates: {
    marginTop: '1rem'
  }, 
  pendingTitle: {
    marginBottom: '2rem'
  },
  linearProgress: {
    width: '50%'
  },
  noJobs: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '50vh'
  },
  noJobsIcon: {
    marginTop: 10,
    width: 40,
    height: 40
  },
  accordionGray: {
    background: '#f0f0f0'
  },
  status: {
    marginTop: '20px'
  },
  deleteButton: {
    color: '#ff6b65'
  }
});

export default useAccordionStyles;
