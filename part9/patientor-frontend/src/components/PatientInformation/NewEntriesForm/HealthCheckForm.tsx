import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { HealthCheckRating } from "../../../types";

interface Props {
  healthRating: HealthCheckRating;
  setHealthRating: React.Dispatch<React.SetStateAction<HealthCheckRating>>;
}

const healthRatingOptions = Object.entries(HealthCheckRating)
  .filter(([_key, value]) => typeof value === "number") // Only numeric values
  .map(([key, value]) => ({
    label: key, // "Healthy", "LowRisk", etc
    value: value as number, // 0, 1, 2, 3
  }));

const HealthCheckForm = ({ healthRating, setHealthRating }: Props) => {
  return (
    <Box component="section">
      <FormControl required fullWidth size="medium" style={{ marginTop: "20px" }}>
        <InputLabel id="health-check">Health Check Rating</InputLabel>
        <Select
          label="Health Check Rating"
          labelId="health-check"
          fullWidth
          size="small"
          style={{ marginTop: "0px" }}
          value={healthRating}
          onChange={(event: SelectChangeEvent<number>) => {
            setHealthRating(Number(event.target.value) as HealthCheckRating);
          }}
        >
          {healthRatingOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default HealthCheckForm;
