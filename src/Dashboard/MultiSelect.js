import { Autocomplete, TextField } from "@mui/material";
import { rolesList } from "./filtersList";

export default function MultiSelect({
  id,
  placeholder,
  allFilters,
  setAllFilters,
  data,
}) {
  return (
    <Autocomplete
      multiple
      id={id}
      options={data}
      groupBy={(option) => option.type}
      getOptionLabel={(option) => (option.title ? option.title : option)}
      onChange={(event, newValue) => {
        console.log("Event: ", id, newValue);
        setAllFilters({
          ...allFilters,
          [id]: newValue,
        });
        //setSelectedData(newValue);
      }}
      filterSelectedOptions
      style={{
        minWidth: "150px",
      }}
      renderInput={(params) => (
        <TextField {...params} placeholder={placeholder} />
      )}
    />
  );
}
