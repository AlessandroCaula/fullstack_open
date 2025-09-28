import { Alert, Box, Button, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import entriesService from "../../services/entries";
import { EntryFormValues, HealthCheckRating, Patient } from "../../types";
import axios from "axios";

interface Props {
  id: string | undefined;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

// Defining EntryType so that TypeScript will know that entriesType is exactly one of the allowed values
type EntryType = "Hospital" | "HealthCheck" | "OccupationalHealthcare";

interface TypeOptions {
  value: EntryType; 
  label: string;
}

const entriesTypeOptions: TypeOptions[] = [
  { value: "Hospital", label: "Hospital" },
  { value: "HealthCheck", label: "Health Check" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" }
];

const healthRatingOptions = Object.entries(HealthCheckRating)
  .filter(([_key, value]) => typeof value === "number")  // Only numeric values
  .map(([key, value]) => ({
    label: key,   // "Healthy", "LowRisk", etc
    value: value as number,   // 0, 1, 2, 3
  }));

const NewPatientEntriesForm = ({ id, setPatient }: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodesString, setDiagnosisCodesString] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [entriesType, setEntriesType] = useState<EntryType>("Hospital");

  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");

  const [healthRating, setHealthRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);

  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");

  // If there is no patient ID
  if (!id) {
    return null;
  }

  const onCancel = (event: SyntheticEvent) => {
    event.preventDefault();
    setDescription("");
    setDate("");
    setSpecialist("");
    setDiagnosisCodesString("");
    setError("");
  };

  const submitNewEntries = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      // Parse the diagnosis codes, so that they are a list of code strings
      const diagnosisCodes = diagnosisCodesString
        .split(",")
        .map((el) => el.trim());
      
      // const values: EntryFormValues = {
      //   description,
      //   date,
      //   specialist,
      //   diagnosisCodes,
      //   type: "HealthCheck",
      //   healthCheckRating: 0,
      // };

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
          }
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
          }
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
      // Reset the entries form
      setDescription("");
      setDate("");
      setSpecialist("");
      setDiagnosisCodesString("");
      setError("");
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
          <Stack spacing={"10px"}>
            <TextField
              label="Description"
              variant="standard"
              size="small"
              required
              multiline
              fullWidth
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
            <TextField
              label="Date"
              variant="standard"
              size="small"
              placeholder="YYYY-MM-DD"
              required
              fullWidth
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
            <TextField
              label="Specialist"
              variant="standard"
              size="small"
              required
              fullWidth
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
            <TextField
              label="Diagnosis codes"
              variant="standard"
              size="small"
              fullWidth
              value={diagnosisCodesString}
              onChange={({ target }) => setDiagnosisCodesString(target.value)}
            />

            <InputLabel style={{ marginTop: '20px' }}>Type</InputLabel>
            <Select
              label="Type"
              fullWidth
              size="small"
              style={{ marginTop: '0px' }}
              value={entriesType}
              onChange={(event: SelectChangeEvent<EntryType>) => {
                setEntriesType(event.target.value as EntryType);
              }}
            > 
              {entriesTypeOptions.map(option => (
                <MenuItem
                  key={option.label}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>

            {/* Changing the next components to render based on the entries type */}
            {entriesType === "Hospital" ? (
                <Box component="section" >
                  <InputLabel style={{ marginTop: '10px' }}>Discharge</InputLabel>
                  <Stack spacing={'10px'}>
                    <TextField 
                      label="Discharge Date"
                      placeholder="YYYY-MM-DD"
                      variant="standard"
                      size="small"
                      required
                      fullWidth
                      value={dischargeDate}
                      onChange={({ target }) => setDischargeDate(target.value)}
                    />
                    <TextField 
                      label="Discharge Criteria"
                      variant="standard"
                      size="small"
                      required
                      fullWidth
                      value={dischargeCriteria}
                      onChange={({ target }) => setDischargeCriteria(target.value)}
                    />
                  </Stack>
                </Box>
              ) : entriesType === "HealthCheck" ? (
                <Box component="section">
                  <InputLabel style={{ marginTop: '10px' }}>Health Check Rating</InputLabel>
                  <Select
                    label="Health Check Rating"
                    fullWidth
                    size="small"
                    style={{ marginTop: '0px' }}
                    value={healthRating}
                    onChange={(event: SelectChangeEvent<number>) => {
                      setHealthRating(Number(event.target.value) as HealthCheckRating);
                    }}
                  >
                    {healthRatingOptions.map(option => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              ) : (
                <Box component="section">
                  <Stack spacing={'10px'}>
                    <TextField 
                      label="Employer Name"
                      variant="standard"
                      size="small"
                      required
                      fullWidth
                      value={employerName}
                      onChange={({ target }) => setEmployerName(target.value)}
                    />
                    <InputLabel style={{ marginTop: '20px' }}>Sick Leave</InputLabel>
                    <Box 
                      component="section"
                      sx={{ display: "flex" }}
                      style={{ margin: "0px"}}
                    >
                      <TextField 
                        label="Start Date"
                        variant="standard"
                        size="small"
                        placeholder="YYYY-MM-DD"
                        fullWidth
                        required
                        style={{ marginRight: '20px' }}
                        value={sickLeaveStartDate}
                        onChange={({ target }) => setSickLeaveStartDate(target.value)}
                      />
                      <TextField
                        label="End Date"
                        variant="standard"
                        size="small"
                        placeholder="YYYY-MM-DD"
                        fullWidth
                        required
                        style={{ marginLeft: '20px' }}
                        value={sickLeaveEndDate}
                        onChange={({ target }) => setSickLeaveEndDate(target.value)}
                      />
                    </Box>
                  </Stack>
                </Box>
              )
            }
            
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

export default NewPatientEntriesForm;
