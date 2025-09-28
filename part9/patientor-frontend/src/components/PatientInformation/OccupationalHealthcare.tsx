import { Entry } from '../../types';

interface Props {
  entry: Entry;
}

const OccupationalHealthcare = ({ entry }: Props) => {
  // Return if the entry is not OccupationalHealthcare
  if (entry.type !== 'OccupationalHealthcare') {
    return null;
  }

  return (
    <div>
      <p>Employer name: {entry.employerName}</p>
      {entry.sickLeave ? (
        <div>
          <p style={{ marginBottom: '5px' }}>Sick Leave</p>
          <p style={{ margin: '0px' }}>- Start date: {entry.sickLeave?.startDate}</p>
          <p style={{ margin: '0px' }}>- End date: {entry.sickLeave?.endDate}</p>
        </div>
      ) : <></>}
    </div>
  );
};

export default OccupationalHealthcare;