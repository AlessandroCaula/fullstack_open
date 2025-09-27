import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import EntryDetails from "./EntryDetails";
import NewPatientEntriesForm from "./NewPatientEntriesForm";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientInformation = ({ diagnoses }: Props) => {
  // Retrieve the id of the selected patient
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);

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
  if (!patient) {
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
      <NewPatientEntriesForm id={id} setPatient={setPatient} />
      {patient.entries !== undefined && patient.entries?.length > 0 ? (
        <EntryDetails patient={patient} diagnoses={diagnoses} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default PatientInformation;
