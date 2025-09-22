import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { useEffect, useState } from "react";
import patientService from "../services/patients";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

// interface Props {
//   patients: Patient[];
// }

const PatientInformation = () => {
  // Retrieve the id of the selected patient
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();

  // Fetching the all the patient data information from the backend
  useEffect(() => {
    const fetchPatient = async () => {
      // Return if the id is undefined
      if (id === undefined) {
        return;
      }

      // Get the patient information
      const patient = await patientService.getPatient(id);
      // console.log(patient);
      setPatient(patient);
    };

    // Call the async fetch data
    void fetchPatient();
  }, [id]);

  // If patient is undefined return
  if (patient === undefined) {
    return <h1 style={{ color: "red" }}>Patient not found</h1>;
  }

  return (
    <div>
      <div>
        <h2>
          {patient.name}
          {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
        </h2>
      </div>
      <p>ssn: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      {/* If the patient has some defined entries then render them */}
      {(patient.entries !== undefined && patient.entries?.length > 0) ? (
        <div>
          <h3>Entries</h3>
          {/* Render the entries of the patients */}
          {patient.entries?.map((entry) => (
            <div key={entry.id}>
              <p>
                - {entry.date}:{" "}
                <span style={{ fontStyle: "italic" }}>{entry.description}</span>
              </p>
              {/* Render the diagnoses codes */}
              <ul>
                {entry.diagnosisCodes?.map((code) => (
                  <li key={code}>{code}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PatientInformation;
