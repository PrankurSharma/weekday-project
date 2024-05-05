import { styled } from "@mui/material/styles";
import { CircularProgress, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import DashboardFilters from "./DashboardFilters";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px 0px !important",
  borderRadius: "20px",
  textAlign: "center",
  color: theme.palette.text.secondary,
  maxWidth: "360px",
  marginTop: "8px",
}));

export default function Dashboard() {
  const [jdData, setJdData] = useState({}); //original data is stored in this state
  const [filteredJdData, setFilteredJdData] = useState({}); //filtered data is stored in this state
  const [offset, setOffset] = useState(0); //offset value for fetching data from the api
  const [isLoading, setIsLoading] = useState(false); //Tells us if the user has reached the bottom of the page while scrolling
  const [isDataFetched, setIsDataFetched] = useState(false); //Handles initial case when the data is being fetched.
  const [allFilters, setAllFilters] = useState({
    jobRole: [],
    companyName: "",
    location: [],
    remote: [],
    minJdSalary: -1,
    minExp: -1,
  }); //Represents all the filters available

  useEffect(() => {
    //handleScroll();
    fetchData();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //this useEffect checks if the content fits in the viewport(No scroll possible). This will trigger the api once again as the user can't scroll further and will keep triggering it till the content exceeds the document height.
  useEffect(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight &&
      offset < jdData.totalCount
      //Un-comment this line if it is required to stop the api calls if the filters are applied but no data was found in the given results. I'm commenting it out because there can be data in the furhter fields which matches the given filters.
      //&& !checkNoData(allFilters, filteredJdData)
    ) {
      setTimeout(() => {
        fetchData();
      }, 2000);
    }
  }, [filteredJdData]);

  //every time the loading state changes, I'm calling this useEffect which fetches the new data from the api.
  useEffect(() => {
    if (!isLoading) {
      return;
    }
    console.log("Offset: ", offset, jdData);
    //checking if offset is less than total records in the database. If the offset value exceeds, there is no need to call the api again.
    if (offset < jdData.totalCount) {
      //Added debouncing to avoid un-necessary api calls
      setTimeout(() => {
        fetchData();
      }, 2000);
    }
  }, [isLoading]);
  //this function handles the scroll event. Every time the user scrolls in the page, this function gets triggered.
  const handleScroll = () => {
    console.log(
      "Scrolled: ",
      window.innerHeight,
      window.scrollY,
      document.body.offsetHeight,
      offset,
    );
    //this condition makes sure every time the user reaches the bottom of the page, the api call gets triggered. I'm setting the loading state to true if the condition is satisfied.
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      console.log("Enters...");
      setIsLoading(true);
      //fetchData(offset);
    }
  };
  const fetchData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      limit: 10,
      offset: offset,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions,
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.jdList);
        //my data will set the data to the state. In the initial case, everything from the api call will be considered. Afterwards, when this function gets called, it will add the elements to the previous jdList array
        let myData = {
          ...jdData,
          jdList: jdData.jdList
            ? jdData.jdList.concat(result.jdList)
            : result.jdList,
          totalCount: result.totalCount,
        };
        console.log("myData: ", myData);
        setJdData(myData);
        //offset value changes every time. Every time we call this api, we fetch 10 records. So, offset increases by 10
        setOffset(offset + 10);
        //this will stop the loading state after successfully fetching the data
        setIsLoading(false);
        setIsDataFetched(true);
      })

      .catch((error) => console.error(error));
  };

  //this function checks if there is no data after applying the filters.
  const checkNoData = (allFilters, filteredJdData) => {
    //first condition checks if there is no filtered data found
    //second conditon checks if at least filter is applied(i.e. not equal to [], "" or -1). This means if the filter was applied and no data was found, we show No data message
    return (
      filteredJdData.jdList &&
      filteredJdData.jdList.length === 0 &&
      Object.keys(allFilters).some(
        (val) =>
          (Array.isArray(allFilters[val]) && allFilters[val].length > 0) ||
          (!Array.isArray(allFilters[val]) &&
            allFilters[val] !== "" &&
            allFilters[val] !== -1) ||
          (!Array.isArray(allFilters[val]) &&
            allFilters[val] !== -1 &&
            allFilters[val] !== ""),
      )
    );
  };
  if (!isDataFetched) {
    return <CircularProgress />;
  } else {
    return (
      <>
        <DashboardFilters
          data={jdData}
          setData={setJdData}
          filteredData={filteredJdData}
          setFilteredData={setFilteredJdData}
          allFilters={allFilters}
          setAllFilters={setAllFilters}
        />
        <Grid container spacing={3} style={{ padding: "0 20px 20px" }}>
          {filteredJdData.jdList && filteredJdData.jdList.length > 0
            ? filteredJdData.jdList.map((val) => {
                return (
                  <Grid item xs={12} md={6} lg={4}>
                    <Item className="main-item">
                      <DashboardCard data={val} />
                    </Item>
                  </Grid>
                );
              })
            : checkNoData(allFilters, filteredJdData)
              ? "No data"
              : jdData.jdList.map((val) => {
                  return (
                    <Grid item xs={12} md={6} lg={4}>
                      <Item className="main-item">
                        <DashboardCard data={val} />
                      </Item>
                    </Grid>
                  );
                })}
        </Grid>
        {isLoading && <CircularProgress sx={{ marginTop: "20px" }} />}
      </>
    );
  }
}
