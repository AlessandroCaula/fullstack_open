import {
  Box,
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
      <InputLabel style={{ marginTop: "10px" }}>Health Check Rating</InputLabel>
      <Select
        label="Health Check Rating"
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
    </Box>
  );
};

export default HealthCheckForm;
