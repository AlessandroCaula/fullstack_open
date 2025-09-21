import diagnosesData from "../../data/diagnosesData";
import { DiagnosisEntry } from "../types";

// Service for retrieving all the diagnoses
const getDiagnoses = (): DiagnosisEntry[] => {
  return diagnosesData;
};

export default {
  getDiagnoses
};