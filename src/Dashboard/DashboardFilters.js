import { Autocomplete, Box, Select, TextField } from "@mui/material";
import {
  experienceList,
  locationsList,
  rolesList,
  salaryList,
  typesList,
} from "./filtersList";
import AutoCompleteComponent from "./AutoCompleteComponent";
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
            console.log("ALL FILTERS VAL: ", allFilters[key], key);
            //if we are setting the remote filter, we have to compare it using the locations list.
            if (key === "remote") {
              //if selected value is remote work, filter out all the values from the location list that matches remote
              if (val["location"] === "remote") {
                return allFilters[key]
                  .map((x) => {
                    return x.toLowerCase();
                  })
                  .includes(val["location"]);
              }
              //Otherwise for on site work, any value in the locations list will not be equal to On site. So, we have to apply the condition that it should not match with On-site as well as remote.
              //Consideration: If a location other than remote is mentioned, it is considered on site
              else {
                console.log("Location filter: ", val["location"]);
                return (
                  !allFilters[key]
                    .map((x) => {
                      return x.toLowerCase();
                    })
                    .includes(val["location"]) && val["location"] !== "remote"
                );
              }
            } else {
              return allFilters[key]
                .map((x) => {
                  return x.title ? x.title.toLowerCase() : x.toLowerCase();
                })
                .includes(val[key]);
            }
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
        console.log("All filters key: ", allFilters, key);
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
      <div className="filters-div">
        <Box className="filter-box">
          <p>{allFilters.jobRole.length > 0 ? "Roles" : ""}</p>
          <AutoCompleteComponent
            id="jobRole"
            allFilters={allFilters}
            setAllFilters={setAllFilters}
            placeholder={"Roles"}
            data={rolesList}
            isMulti={true}
          />
        </Box>
        <Box className="filter-box">
          <p>{allFilters.minExp !== -1 ? "Experience" : ""}</p>
          <AutoCompleteComponent
            id="minExp"
            allFilters={allFilters}
            setAllFilters={setAllFilters}
            placeholder={"Experience"}
            isMulti={false}
            data={experienceList}
          />
        </Box>
        <Box className="filter-box">
          <p>{allFilters.remote.length > 0 ? "Remote" : ""}</p>
          <AutoCompleteComponent
            id="remote"
            allFilters={allFilters}
            setAllFilters={setAllFilters}
            placeholder={"Remote"}
            data={typesList}
            isMulti={true}
          />
        </Box>
        <Box className="filter-box">
          <p>{allFilters.location.length > 0 ? "Location" : ""}</p>
          <AutoCompleteComponent
            id="location"
            allFilters={allFilters}
            setAllFilters={setAllFilters}
            placeholder={"Location"}
            data={locationsList}
            isMulti={true}
          />
        </Box>
        <Box className="filter-box">
          <p>
            {allFilters.minJdSalary !== -1 ? "Minimum Base Pay Salary" : ""}
          </p>
          <AutoCompleteComponent
            id="minJdSalary"
            allFilters={allFilters}
            setAllFilters={setAllFilters}
            placeholder={"Minimum Base Pay Salary"}
            isMulti={false}
            data={salaryList}
          />
        </Box>
        <Box className="filter-box">
          <p>{allFilters.companyName !== "" ? "Company Name" : ""}</p>
          <TextField
            id="companyName"
            onChange={(event) => {
              setAllFilters({
                ...allFilters,
                [event.target.id]: event.target.value,
              });
            }}
            placeholder="Company Name"
          />
        </Box>
      </div>
    </>
  );
}
