import { Box, FormControl, Input, InputLabel, Stack, TextField } from "@mui/material";

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
        <FormControl
          fullWidth
          required
          variant="standard"
          style={{ marginTop: "10px" }}
        >
          <InputLabel htmlFor="standard-date">Discharge Date</InputLabel>
          <Input
            id="standard-date"
            startAdornment={<></>}
            type="date"
            size="small"
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
          />
        </FormControl>

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
