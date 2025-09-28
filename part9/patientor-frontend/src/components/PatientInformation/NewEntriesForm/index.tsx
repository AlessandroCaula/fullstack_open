import { Alert, Box, Button, Stack } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import entriesService from "../../../services/entries";
import { EntryFormValues, HealthCheckRating, Patient } from "../../../types";
import axios from "axios";
import HospitalForm from "./HospitalForm";
import HealthCheckForm from "./HealthCheckForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import CommonEntriesForm from "./CommonEntriesForm";

interface Props {
  id: string | undefined;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

// Defining EntryType so that TypeScript will know that entriesType is exactly one of the allowed values
type EntryType = "Hospital" | "HealthCheck" | "OccupationalHealthcare";

const NewEntriesForm = ({ id, setPatient }: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodesString, setDiagnosisCodesString] = useState<string>("");
  const [error, setError] = useState<string>("");
  // Entries Type state
  const [entriesType, setEntriesType] = useState<EntryType>("Hospital");
  // Hospital entries
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
  // HealthCheck entries
  const [healthRating, setHealthRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  // OccupationalHealthcare entries
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");

  // If there is no patient ID
  if (!id) {
    return null;
  }

  const resetStates = () => {
    // Reset the entries form
    setDescription("");
    setDate("");
    setSpecialist("");
    setDiagnosisCodesString("");
    setDischargeDate("");
    setDischargeCriteria("");
    setHealthRating(HealthCheckRating.Healthy);
    setEmployerName("");
    setSickLeaveStartDate("");
    setSickLeaveEndDate("");
    setError("");
  };

  const onCancel = (event: SyntheticEvent) => {
    event.preventDefault();
    resetStates();
  };

  const submitNewEntries = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      // Parse the diagnosis codes, so that they are a list of code strings
      const diagnosisCodes =
        diagnosisCodesString.length > 0
          ? diagnosisCodesString.split(",").map((el) => el.trim())
          : undefined;

      let values: EntryFormValues;
      // Define the values dynamically based on the entriesType
      if (entriesType === "Hospital") {
        values = {
          description,
          date,
          specialist,
          diagnosisCodes,
          type: entriesType,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
      } else if (entriesType === "HealthCheck") {
        values = {
          description,
          date,
          specialist,
          diagnosisCodes,
          type: entriesType,
          healthCheckRating: healthRating,
        };
      } else if (entriesType === "OccupationalHealthcare") {
        // Check that both the start and end date for the sickLeave have or have not a date.
        values = {
          description,
          date,
          specialist,
          diagnosisCodes,
          type: entriesType,
          employerName,
          sickLeave: {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          },
        };
      } else {
        throw new Error("Invalid entry type");
      }

      // Adding the new entries to the patient
      const entries = await entriesService.create(id, values);
      // Add the new entries to the patient state so that it will update
      setPatient((prevPatient) => {
        if (!prevPatient) return prevPatient;
        return {
          ...prevPatient,
          entries: prevPatient.entries?.concat([entries]),
        };
      });
      resetStates();
    } catch (e: unknown) {
      // Dealing with possible errors
      if (axios.isAxiosError(e)) {
        if (e?.response?.data) {
          // && typeof e?.response?.data === "string"
          const message = e?.response?.data?.error[0].message;
          setError(message);
        }
      } else {
        console.log("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <Box
        component="section"
        sx={{
          p: "10px",
          m: "0px",
          border: "2px dashed grey",
          borderRadius: "5px",
        }}
      >
        <h3 style={{ margin: "0px" }}>New Patient entry</h3>
        <form onSubmit={submitNewEntries}>
          <CommonEntriesForm
            description={description}
            setDescription={setDescription}
            date={date}
            setDate={setDate}
            specialist={specialist}
            setSpecialist={setSpecialist}
            diagnosisCodesString={diagnosisCodesString}
            setDiagnosisCodesString={setDiagnosisCodesString}
            entriesType={entriesType}
            setEntriesType={setEntriesType}
          />

          <Stack spacing={"5px"}>
            {/* Changing the next components to render based on the entries type */}
            {entriesType === "Hospital" ? (
              <HospitalForm
                dischargeDate={dischargeDate}
                setDischargeDate={setDischargeDate}
                dischargeCriteria={dischargeCriteria}
                setDischargeCriteria={setDischargeCriteria}
              />
            ) : entriesType === "HealthCheck" ? (
              <HealthCheckForm
                healthRating={healthRating}
                setHealthRating={setHealthRating}
              />
            ) : (
              <OccupationalHealthcareForm
                employerName={employerName}
                setEmployerName={setEmployerName}
                sickLeaveStartDate={sickLeaveStartDate}
                setSickLeaveStartDate={setSickLeaveStartDate}
                sickLeaveEndDate={sickLeaveEndDate}
                setSickLeaveEndDate={setSickLeaveEndDate}
              />
            )}

            <Box
              component="section"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0 0 0",
              }}
            >
              <Button
                type="button"
                variant="contained"
                sx={{
                  bgcolor: "#ff0019ff",
                  "&:hover": { bgcolor: "#ab0011ff" },
                }}
                onClick={onCancel}
              >
                CANCEL
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "#c8c8c8ff",
                  color: "#656565ff",
                  "&:hover": { color: "#fcfcfcff" },
                }}
              >
                ADD
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </div>
  );
};

export default NewEntriesForm;
