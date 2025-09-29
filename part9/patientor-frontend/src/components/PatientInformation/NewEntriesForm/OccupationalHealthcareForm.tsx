import {
  Box,
  FormControl,
  Input,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";

interface Props {
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  sickLeaveStartDate: string;
  setSickLeaveStartDate: React.Dispatch<React.SetStateAction<string>>;
  sickLeaveEndDate: string;
  setSickLeaveEndDate: React.Dispatch<React.SetStateAction<string>>;
}

const OccupationalHealthcareForm = ({
  employerName,
  setEmployerName,
  sickLeaveStartDate,
  setSickLeaveStartDate,
  sickLeaveEndDate,
  setSickLeaveEndDate,
}: Props) => {
  return (
    <Box component="section">
      <Stack spacing={"5px"} marginTop={"5px"}>
        <TextField
          label="Employer Name"
          variant="standard"
          size="small"
          required
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />
        <InputLabel style={{ marginTop: "20px" }}>Sick Leave</InputLabel>
        <Box
          component="section"
          sx={{ display: "flex" }}
          style={{ margin: "0px", marginLeft: '10px' }}
        >
          <FormControl
            fullWidth
            variant="standard"
            style={{ marginTop: "5px", marginRight: "20px" }}
          >
            <InputLabel htmlFor="standard-date">Start Date</InputLabel>
            <Input
              id="standard-date"
              startAdornment={<></>}
              type="date"
              size="small"
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            />
          </FormControl>

          <FormControl
            fullWidth
            variant="standard"
            style={{ marginTop: "5px", marginLeft: "20px" }}
          >
            <InputLabel htmlFor="standard-date">Start Date</InputLabel>
            <Input
              id="standard-date"
              startAdornment={<></>}
              type="date"
              size="small"
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            />
          </FormControl>
        </Box>
      </Stack>
    </Box>
  );
};

export default OccupationalHealthcareForm;
