import { makeStyles } from '@material-ui/core/styles';

const useCardStyles = makeStyles({
  root: {
    marginBottom: '1rem',
    marginTop: '1rem',
    boxShadow: 'none',
    '&$expanded': {
      margin: '0 0 3px 0',
    },
  },
  expanded: {},
  header: {
    backgroundColor: '#3F81F3',
    color: '#F6F6F6',
    fontWeight: 400,
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#203988',
  },
  warning: {
    backgroundColor: '#FFB75D',
    color: '#4f4f4f',
  },
  summaryRoot: {
    height: '3.5rem',
    '&$expanded': {
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
  },
});

export default useCardStyles;
