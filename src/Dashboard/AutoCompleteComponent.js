import { Autocomplete, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AutocompleteComponent({
  id,
  placeholder,
  allFilters,
  setAllFilters,
  data,
  isMulti,
}) {
  return (
    <Autocomplete
      multiple={isMulti}
      id={id}
      options={data}
      popupIcon={
        <div className="arrow-wrap">
          <ExpandMoreIcon />
        </div>
      }
      sx={{
        "& .MuiAutocomplete-popupIndicator": {
          transform: "rotate(0)",
          transition: "none",
        },
        "& .MuiAutocomplete-popupIndicator:hover": {
          transition: "none",
        },
      }}
      groupBy={(option) => option.type}
      getOptionLabel={(option) => (option.title ? option.title : option)}
      onChange={(event, newValue) => {
        console.log("Event: ", id, newValue);
        setAllFilters({
          ...allFilters,
          [id]: newValue
            ? id === "minJdSalary" || id === "minExp"
              ? parseInt(newValue)
              : newValue
            : id === "minExp" || id === "minJdSalary"
              ? -1
              : "",
        });
        //setSelectedData(newValue);
      }}
      filterSelectedOptions
      style={{
        minWidth: "150px",
        //height: "38px",
      }}
      renderInput={(params) => (
        <TextField {...params} placeholder={placeholder} />
      )}
    />
  );
}
