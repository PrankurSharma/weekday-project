import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Link,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import ModalContent from "./ModalContent";

export default function DashboardCard({ data }) {
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };
  const handleOpen = () => {
    setOpenModal(true);
  };

  return (
    <>
      <Card className="main-card">
        <Box style={{ display: "flex", width: "100%", padding: "5px 0" }}>
          <Box
            style={{
              display: "flex",
              alignItems: "flex-start",
              padding: "5px 10px",
              flexWrap: "wrap",
              gap: "5px",
              width: "100%",
              flex: "1 1 0%",
            }}
          >
            <Box
              style={{
                padding: "4px 6px",
                boxShadow: "rgba(6, 6, 6, 0.05) 0px 2px 6px 0px",
                borderRadius: "10px",
                border: "1px solid rgb(230, 230, 230)",
              }}
            >
              <p
                className="MuiTypography-root MuiTypography-body1"
                style={{ margin: "0px", fontSize: "9px", lineHeight: "1.5" }}
              >
                &#9203;&nbsp;Posted 3 days ago
              </p>
            </Box>
          </Box>
        </Box>
        <CardContent
          style={{
            width: "auto",
            padding: "8px 16px",
          }}
        >
          <Box style={{ display: "flex", gap: "0.5rem" }}>
            <Box
              sx={{ width: "25px", height: "2.5rem" }}
              component={"img"}
              src={data.logoUrl}
            />
            <div style={{ padding: "0px" }}>
              <div>
                <Box
                  sx={{
                    fontSize: "13px",
                    fontWeight: "600",
                    letterSpacing: "1px",
                    lineHeight: "0",
                    marginBottom: "3px",
                    color: "#8b8b8b",
                    width: "fit-content",
                  }}
                  component={"h3"}
                >
                  {data.companyName}
                </Box>
                {data.jobRole && (
                  <h2
                    style={{
                      fontSize: "14px",
                      lineHeight: "1.5",
                      width: "fit-content",
                      fontWeight: "400",
                      textTransform: "capitalize",
                    }}
                  >
                    {data.jobRole}
                  </h2>
                )}
              </div>
              {data.location && (
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: "500",
                    marginTop: "5px",
                    marginBottom: "0px",
                    width: "fit-content",
                    lineHeight: "0",
                    textTransform: "capitalize",
                  }}
                >
                  {data.location}
                </p>
              )}
            </div>
          </Box>
          <Typography
            variant="body2"
            style={{
              fontSize: "14px",
              margin: "12px 0",
              fontWeight: "400",
              color: "rgb(77, 89, 106)",
              lineHeight: "1.43",
              width: "fit-content",
            }}
          >
            Estimated Salary:{" "}
            {data.minJdSalary
              ? "$" + data.minJdSalary + `${data.maxJdSalary ? " - " : ""}`
              : ""}
            {data.maxJdSalary
              ? data.minJdSalary
                ? data.maxJdSalary
                : "$" + data.maxJdSalary
              : ""}
            <span>&#9989;</span>
          </Typography>
          <Box
            sx={{
              height: "250px",
              overflow: "hidden",
              maskImage:
                "linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255), rgba(255, 255, 255, 0))",
            }}
          >
            <Box>
              <Typography variant="body2" className="job-details-head">
                About Company:
              </Typography>
              <Box
                sx={{
                  whiteSpace: "pre-wrap",
                  textAlign: "left",
                  fontSize: "14px",
                }}
              >
                {data.jobDetailsFromCompany}
              </Box>
            </Box>
          </Box>
          <Box>
            <a className="job-details-link" onClick={handleOpen}>
              View Job
            </a>
            <Modal
              open={openModal}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ModalContent data={data} />
            </Modal>
          </Box>
          {data.minExp && (
            <div className="info-container">
              <h3>Minimum Experience</h3>
              <h2>{data.minExp + " years"}</h2>
            </div>
          )}
        </CardContent>
        <Box
          sx={{ padding: "0 15px", display: "flex", flexDirection: "column" }}
        >
          <Box>
            <Button size="medium" className="easy-apply">
              &#9889;&nbsp;Easy Apply
            </Button>
          </Box>
          <Button className="referral-button">
            <Box className="avatar-box">
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                className="avatar-img"
              />
              <Typography className="referral-content">
                Ask for Referral
              </Typography>
            </Box>
          </Button>
        </Box>
      </Card>
    </>
  );
}
