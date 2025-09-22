import { Entry } from '../../types';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
  entry: Entry;
}

const HealthCheck = ({ entry }: Props) => {
  // If the entry type is not the HealthCheck, return.
  if (entry.type !== 'HealthCheck') {
    return null;
  }
  
  // Define a color of the heart based on the healthCheckRating
  let heartColor = 'black';
  if (entry.healthCheckRating == 0) {
    heartColor = 'green';
  } else if (entry.healthCheckRating == 1) {
    heartColor = 'yellow';
  } else if (entry.healthCheckRating == 2) {
    heartColor = 'orange';
  } else if (entry.healthCheckRating == 3) {
    heartColor = 'red';
  }

  return (
    <div style={{ margin: '0px', padding: '0px' }}>
      <FavoriteIcon style={{ color: heartColor }} /> 
    </div>
  );
};

export default HealthCheck;