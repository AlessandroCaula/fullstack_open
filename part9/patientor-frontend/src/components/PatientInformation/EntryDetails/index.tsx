import { Diagnosis, Entry, Patient } from "../../../types";
import { Box } from "@mui/material";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";
import HealthCheck from "./HealthCheck";

interface Props {
  patient: Patient;
  diagnoses: Diagnosis[];
}

const EntryDetails = ({ patient, diagnoses }: Props) => {

  const assertNever = (entry: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(entry)}`
    );
  };

  console.log(patient);

  const renderEntryTypes = (entry: Entry) => {
    switch(entry.type) {
      case "Hospital":
        return <Hospital entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcare entry={entry} />;
      case "HealthCheck":
        return <HealthCheck entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div>
      <h3>Entries</h3>
      {/* Render the entries of the patients */}
      {patient.entries?.map((entry) => (
        <Box 
          key={entry.id} 
          sx={{ 
            border: '2px solid black',
            borderRadius: '5px',
            marginBottom: '5px',
            padding: '5px' 
          }} 
        >
          <p style={{ margin: "0px", paddingBottom: '5px' }}> 
            {entry.date}
          </p>
          <p style={{ fontStyle: "italic", margin: "0px" }}>
            {entry.description}
          </p>
          {/* Render the diagnoses codes */}
          <ul style={{ margin: '10px 0 10px 0' }}>
            {entry.diagnosisCodes?.map((code) => {
              // Find the current diagnosis name from the code
              const diagnosisCodeName = diagnoses.find((el) => el.code === code)?.name;
              return (
                <li key={code} style={{ marginBottom: '3px' }}>
                  {code}: {diagnosisCodeName !== undefined ? diagnosisCodeName : ""}
                </li>
              );
            })}
          </ul>
          {renderEntryTypes(entry)}
          <p style={{ margin: '10px 0 0 0' }}>Diagnose by {entry.specialist}</p>
        </Box>
      ))}
    </div>
  );
};

export default EntryDetails;
