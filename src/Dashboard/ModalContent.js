import { Box, Typography } from "@mui/material";

export default function ModalContent({ data }) {
  return (
    <Box className="modal-box">
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        className="job-des"
      >
        Job Description
      </Typography>
      <Typography variant="body1" component="p" className="job-details-head">
        About Company:
      </Typography>
      <Typography variant="body1" component="p" className="job-details">
        {data.jobDetailsFromCompany}
      </Typography>
    </Box>
  );
}
