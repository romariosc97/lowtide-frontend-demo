import { makeStyles } from '@material-ui/core/styles';

const useCardStyles = makeStyles({
  root: {
    width: '100%',
    marginBottom: '1rem',
    marginTop: '1rem',
    boxShadow: 'none',
    '&$expanded': {
      margin: '0 0 3px 0',
    },
    '&:before': {
      height: '0px'
    }
  },
  expanded: {
    marginTop: '1rem',
    '& .MuiIconButton-root':{
      marginTop: '0rem',
    }
  },
  header: {
    backgroundColor: '#3F81F3',
    color: '#F6F6F6',
    fontWeight: 400,
    alignItems: 'center',
    borderRadius: "7px"
  },
  selected: {
    backgroundColor: '#203988',
  },
  warning: {
    backgroundColor: '#203988',
    //color: '#4f4f4f',
  },
  summaryRoot: {
    height: '3.5rem',
    '&.MuiAccordionSummary-root.Mui-expanded': {
      minHeight: '3.5rem',
    },
  },
  arrow: {
    color: '#F6F6F6',
  },
  summaryContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    padding: '0',
  },
  detailsRoot: {
    padding: 16,
    fontSize: '.8rem',
    background: '#F2F2F2'
  },
  loadingCard: {
    opacity: 0.6
  }
});

export default useCardStyles;
