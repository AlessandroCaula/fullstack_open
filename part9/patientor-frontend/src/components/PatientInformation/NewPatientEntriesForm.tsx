import { Box, Button, Stack, TextField } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import entriesService from "../../services/entries";
import { EntryFormValues, Patient } from "../../types";

interface Props {
  id: string | undefined;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

const NewPatientEntriesForm = ({ id, setPatient }: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodesString, setDiagnosisCodesString] = useState<string>("");

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
  };

  const submitNewEntries = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      // Parse the diagnosis codes, so that they are a list of code strings
      const diagnosisCodes = diagnosisCodesString.split(",").map(el => el.trim());
      const values: EntryFormValues = {
        description,
        date,
        specialist,
        diagnosisCodes,
        type: "HealthCheck",
        healthCheckRating: 0,
      };
      // Adding the new entries to the patient
      const entries = await entriesService.create(id, values);
      // Add the new entries to the patient state so that it will update
      setPatient(prevPatient => {
        if (!prevPatient) return prevPatient;
        return {
          ...prevPatient,
          entries: prevPatient.entries?.concat([entries])
        };
      });
      
    } catch {
      return null;
    }
  };

  return (
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
              sx={{ bgcolor: "#ff0019ff", "&:hover": { bgcolor: "#ab0011ff" } }}
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
  );
};

export default NewPatientEntriesForm;
