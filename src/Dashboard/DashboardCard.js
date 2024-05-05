import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Link,
} from "@mui/material";

export default function DashboardCard({ data }) {
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
                <h2
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.5",
                    width: "fit-content",
                  }}
                >
                  {data.jobRole}
                </h2>
              </div>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: "500",
                  marginTop: "5px",
                  marginBottom: "0px",
                  width: "fit-content",
                }}
              >
                {data.location}
              </p>
            </div>
          </Box>
          <p
            className="MuiTypography-root MuiTypography-body2"
            style={{
              fontSize: "14px",
              margin: "8px 0",
              fontWeight: "400",
              color: "rgb(77, 89, 106)",
              fontFamily: "__LexendFont_7838d2, __LexendFont_Fallback_7838d2",
              lineHeight: "1.43",
              width: "fit-content",
            }}
          >
            Estimated Salary: ${data.minJdSalary ? data.minJdSalary : "0"}
            &nbsp; -&nbsp;{data.maxJdSalary ? data.maxJdSalary : "0"}
          </p>
          <Box
            sx={{
              height: "250px",
              overflow: "hidden",
              maskImage:
                "linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255), rgba(255, 255, 255, 0))",
            }}
          >
            <Box>
              <p
                className="MuiTypography-root MuiTypography-body2"
                style={{
                  margin: "0px",
                  fontFamily:
                    "__LexendFont_7838d2, __LexendFont_Fallback_7838d2",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  fontWeight: "500",
                  width: "fit-content",
                  color: "#0d0d0d",
                }}
              >
                About Company:
              </p>
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
            <a>Show More</a>
          </Box>
          {
            <div className="info-container">
              <h3>Minimum Experience</h3>
              <h2>{data.minExp ? data.minExp : "0"} years</h2>
            </div>
          }
        </CardContent>
        <Box
          sx={{ padding: "0 15px", display: "flex", flexDirection: "column" }}
        >
          <Box>
            <Button size="medium" className="easy-apply">
              Easy Apply
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  );
}
