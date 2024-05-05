import { Autocomplete, Box, Select, TextField } from "@mui/material";
import {
  experienceList,
  locationsList,
  rolesList,
  salaryList,
  typesList,
} from "./filtersList";
import MultiSelect from "./MultiSelect";
import { useEffect, useRef } from "react";

export default function DashboardFilters({
  data,
  setData,
  filteredData,
  setFilteredData,
  allFilters,
  setAllFilters,
}) {
  const filteredRef = useRef(false);
  useEffect(() => {
    console.log("All filters: ", allFilters);
    applyFilters();
  }, [allFilters, data]);

  //this function will apply the filters to the data.
  const applyFilters = () => {
    console.log("All filters: ", allFilters);
    let filteredObj = data;
    let isFiltered = false; //detects if there are any filters applied by the user or not
    //Three types of filters are there:
    //1. Only string: Single select filters/Search filter
    //2. Only number: Single select filters/search filter
    //3. Array: Multi-select
    Object.keys(allFilters).forEach((key) => {
      //These three filters have an array as an input. So, they are handled differently.
      if (key === "jobRole" || key === "location" || key === "remote") {
        //if any filter is applied by the user
        if (allFilters[key].length > 0) {
          //filter out all the elements that are present in the list
          let filteredArray = [];
          filteredArray = filteredObj.jdList.filter((val) => {
            console.log("ALL FILTERS VAL: ", allFilters[key]);
            return allFilters[key]
              .map((x) => {
                return x.title ? x.title.toLowerCase() : x.toLowerCase();
              })
              .includes(val[key]);
          });
          //setting isFiltered to true
          isFiltered = true;
          //setting the filter object with the updated value
          filteredObj = {
            ...filteredObj,
            jdList: filteredArray,
          };
          console.log("Filtering...: ", filteredArray);
        } else {
          console.log("Else entered...");
        }
      } else {
        console.log("All filters key: ", allFilters[key]);
        if (allFilters[key] !== "" && allFilters[key] !== -1) {
          let filteredArray = filteredObj.jdList.filter((val) => {
            return key === "companyName"
              ? val[key].toLowerCase().includes(allFilters[key])
              : key === "minExp"
                ? val[key] === allFilters[key]
                : val[key] >= allFilters[key];
          });
          isFiltered = true;
          filteredObj = {
            ...filteredObj,
            jdList: filteredArray,
          };
          console.log("Filtering...: ", filteredArray);
        }
      }
    });
    //if the user has applied any filter, set the filtered data in the state
    if (isFiltered) {
      setFilteredData({
        ...filteredObj,
      });
    }
    //otherwise filtered data becomes empty.
    else {
      setFilteredData({});
    }
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        <MultiSelect
          id="jobRole"
          allFilters={allFilters}
          setAllFilters={setAllFilters}
          placeholder={"Roles"}
          data={rolesList}
        />
        <Autocomplete
          disablePortal
          id="minExp"
          options={experienceList}
          sx={{ width: 300 }}
          onChange={(event, newValue) => {
            setAllFilters({
              ...allFilters,
              minExp: newValue ? newValue : -1,
            });
          }}
          renderInput={(params) => (
            <TextField {...params} placeholder="Experience" />
          )}
        />
        <MultiSelect
          id="remote"
          allFilters={allFilters}
          setAllFilters={setAllFilters}
          placeholder={"Remote"}
          data={typesList}
        />
        <MultiSelect
          id="location"
          allFilters={allFilters}
          setAllFilters={setAllFilters}
          placeholder={"Location"}
          data={locationsList}
        />
        <Autocomplete
          disablePortal
          id="minJdSalary"
          options={salaryList}
          sx={{ width: 300 }}
          onChange={(event, newValue) => {
            setAllFilters({
              ...allFilters,
              minJdSalary: newValue ? newValue : -1,
            });
          }}
          renderInput={(params) => (
            <TextField {...params} placeholder="Minimum Expected Salary" />
          )}
        />
      </div>
    </>
  );
}
