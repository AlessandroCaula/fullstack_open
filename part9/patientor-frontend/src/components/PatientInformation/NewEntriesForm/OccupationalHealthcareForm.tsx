import { Box, InputLabel, Stack, TextField } from "@mui/material";

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
      <Stack spacing={"5px"}>
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
          style={{ margin: "0px" }}
        >
          <TextField
            label="Start Date"
            variant="standard"
            size="small"
            placeholder="YYYY-MM-DD"
            fullWidth
            // required
            style={{ marginRight: "20px" }}
            value={sickLeaveStartDate}
            onChange={({ target }) => setSickLeaveStartDate(target.value)}
          />
          <TextField
            label="End Date"
            variant="standard"
            size="small"
            placeholder="YYYY-MM-DD"
            fullWidth
            // required
            style={{ marginLeft: "20px" }}
            value={sickLeaveEndDate}
            onChange={({ target }) => setSickLeaveEndDate(target.value)}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default OccupationalHealthcareForm;
