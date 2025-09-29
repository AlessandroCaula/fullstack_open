import {
  Box,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
// import { useState } from "react";
import { Diagnosis } from "../../../types";
import Checkbox from "@mui/material/Checkbox";

// Defining EntryType so that TypeScript will know that entriesType is exactly one of the allowed values
type EntryType = "Hospital" | "HealthCheck" | "OccupationalHealthcare";

interface TypeOptions {
  value: EntryType;
  label: string;
}

const entriesTypeOptions: TypeOptions[] = [
  { value: "Hospital", label: "Hospital" },
  { value: "HealthCheck", label: "Health Check" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  specialist: string;
  setSpecialist: React.Dispatch<React.SetStateAction<string>>;
  diagnosisCodes: string[];
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string[]>>;
  entriesType: EntryType;
  setEntriesType: React.Dispatch<React.SetStateAction<EntryType>>;
  diagnoses: Diagnosis[];
}

const CommonEntriesForm = ({
  description,
  setDescription,
  date,
  setDate,
  specialist,
  setSpecialist,
  diagnosisCodes,
  setDiagnosisCodes,
  entriesType,
  setEntriesType,
  diagnoses,
}: Props) => {
  // Extract all the diagnoses codes as an array of strings.
  const allDiagnosesCodes: string[] = diagnoses.map((d) => d.code);

  const handleCodesChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;

    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Box component="section">
      <Stack spacing={"5px"}>
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
        <FormControl
          fullWidth
          required
          variant="standard"
          style={{ marginTop: "10px" }}
        >
          <InputLabel htmlFor="standard-date">Date</InputLabel>
          <Input
            id="standard-date"
            startAdornment={<></>}
            type="date"
            size="small"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </FormControl>
        <TextField
          label="Specialist"
          variant="standard"
          size="small"
          required
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <FormControl fullWidth style={{ marginTop: "20px" }}>
          <InputLabel size="small">Diagnoses Codes</InputLabel>
          <Select
            size="small"
            multiple
            // label="Diagnoses Codes"
            input={<OutlinedInput label="Diagnoses Codes" />}
            value={diagnosisCodes}
            onChange={handleCodesChange}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {allDiagnosesCodes.map((d) => (
              <MenuItem key={d} value={d}>
                <Checkbox checked={diagnosisCodes.includes(d)} />
                <ListItemText primary={d} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl style={{ marginTop: "20px" }} fullWidth required>
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            label="Type"
            fullWidth
            size="small"
            style={{ marginTop: "0px" }}
            value={entriesType}
            onChange={(event: SelectChangeEvent<EntryType>) => {
              setEntriesType(event.target.value as EntryType);
            }}
          >
            {entriesTypeOptions.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default CommonEntriesForm;
