import { Box, Typography } from "@mui/material";
import notFoundIcon from "../assets/images/notFound.png";

export default function NoJobsFound() {
  return (
    <Box className="no-jobs-box">
      <img style={{ width: "150px", height: "150px" }} src={notFoundIcon} />
      <Typography style={{ fontWeight: "700", lineHeight: "1.5" }}>
        No Jobs available for this category at the moment
      </Typography>
    </Box>
  );
}
