import {
  Box,
  FormControl,
  Input,
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
        <TextField
          label="Diagnosis codes"
          variant="standard"
          size="small"
          fullWidth
          value={diagnosisCodesString}
          onChange={({ target }) => setDiagnosisCodesString(target.value)}
        />
        <FormControl style={{ marginTop: "20px" }} fullWidth required>
          <InputLabel id='type-label'>Type</InputLabel>
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
