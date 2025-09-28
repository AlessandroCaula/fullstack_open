import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";

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

interface Props {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  specialist: string;
  setSpecialist: React.Dispatch<React.SetStateAction<string>>;
  diagnosisCodesString: string;
  setDiagnosisCodesString: React.Dispatch<React.SetStateAction<string>>;
  entriesType: EntryType;
  setEntriesType: React.Dispatch<React.SetStateAction<EntryType>>;
}

const CommonEntriesForm = ({
  description,
  setDescription,
  date,
  setDate,
  specialist,
  setSpecialist,
  diagnosisCodesString,
  setDiagnosisCodesString,
  entriesType,
  setEntriesType,
}: Props) => {
  return (
    <Box component="section">
      <Stack spacing={'5px'}>
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

        <InputLabel style={{ marginTop: "20px" }}>Type</InputLabel>
        <Select
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
      </Stack>
    </Box>
  );
};

export default CommonEntriesForm;
