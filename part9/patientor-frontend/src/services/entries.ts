import axios from "axios";
import { Entry, EntryFormValues } from "../types";
import { apiBaseUrl } from "../constants";

// Create new entries for the specif patient
const create = async (id:string, object: EntryFormValues) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );
  return data;
};

export default {
  create
};