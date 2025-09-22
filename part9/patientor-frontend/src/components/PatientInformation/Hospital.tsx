import { Entry } from '../../types';

interface Props {
  entry: Entry;
}

const Hospital = ({ entry }: Props) => {
  // Return if the entry is not OccupationalHealthcare
  if (entry.type !== 'Hospital') {
    return null;
  }

  return (
    <div>
      <p style={{ margin: '0px' }}>
        <span style={{ margin: '0px', color: "green", fontWeight: "bold" }}>Discharge </span>
        {entry.discharge.date}: {entry.discharge.criteria}
      </p>
    </div>
  );
};

export default Hospital;