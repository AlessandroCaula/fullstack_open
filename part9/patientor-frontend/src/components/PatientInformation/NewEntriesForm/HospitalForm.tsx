import { Box, Stack, TextField } from "@mui/material";

interface Props {
  dischargeDate: string;
  setDischargeDate: React.Dispatch<React.SetStateAction<string>>;
  dischargeCriteria: string;
  setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>;
}

const HospitalForm = ({
  dischargeDate,
  setDischargeDate,
  dischargeCriteria,
  setDischargeCriteria,
}: Props) => {
  return (
    <Box component="section">
      <Stack spacing={"5px"}>
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
  );
};

export default HospitalForm;
