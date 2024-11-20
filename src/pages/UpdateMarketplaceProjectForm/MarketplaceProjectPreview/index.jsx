import React, { useState, useEffect } from "react";
import fundingProjectApiInstance from "../../../utils/ApiInstance/fundingProjectApiInstance.jsx";
import { useParams } from "react-router";
import { Backdrop, CircularProgress } from "@mui/material";
import ProgressChart from "../../../components/Chart/ProgressChart/index.jsx";
import LineChartDashBoard from "../../../components/Chart/LineChartDashboard/index.jsx";
import packageBackerApiInstance from "../../../utils/ApiInstance/packageBackerApiInstance.jsx";
import StatBox from "../../../components/Chart/StatBox/index.jsx";
import { FaWallet, FaEnvelope } from "react-icons/fa";
import Grid from "@mui/material/Grid2";
import BarChartDashboard from "../../../components/Chart/BarChartDashboard/index.jsx";
import { useUpdateMarketplaceProject } from "../../../contexts/UpdateMarketplaceProjectContext.jsx";
import marketplaceProjectApiInstace from "../../../utils/ApiInstance/marketplaceProjectApiInstance.jsx";

function MarketplaceProjectPreview() {
  const { id } = useParams();
  const { marketplaceProject, setMarketplaceProject, edited, setEdited } =
    useUpdateMarketplaceProject();
  const [loading, setLoading] = useState(false);
  const [lineData, setLineData] = useState([]);
  const [barData, setBarData] = useState([]);

  //fetch line chart data
  const fetchLineChart = async (projectId) => {
    try {
      const res = await packageBackerApiInstance.get(
        `/project-backers?projectId=${projectId}`
      );
      console.log(res);

      setLineData(res.data.result._data);
    } catch (error) {
      console.error("Error fetching line chart data:", error);
    }
  };

  //fetch bar data
  const fetchBarData = async (projectId) => {
    try {
      const res = await packageBackerApiInstance.get(
        `/package-backer-count?projectId=${projectId}`
      );
      console.log(res);
      setBarData(res.data.result._data);
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    }
  };
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* statbox */}
      {marketplaceProject && (
        <>
          {/* <Grid container spacing={4} justifyContent="center" m="2rem">
            <Grid item xs={12} sm={6} md={3}>
              <StatBox
                title={marketplaceProject.wallet.balance.toLocaleString(
                  "en-US"
                )}
                subtitle="Wallet Balance"
                increase="+21%"
                icon={<FaWallet size={26} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatBox
                title="12,361"
                subtitle="Emails Sent"
                increase="+14%"
                icon={<FaEnvelope size={26} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatBox
                title="32,441"
                subtitle="New Clients"
                increase="+5%"
                icon={<FaWallet size={26} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatBox
                title="1,325,134"
                subtitle="Traffic Received"
                increase="+43%"
                icon={<FaWallet size={26} />}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent={"center"} m="2rem">
            <Grid sx={8}>
              <LineChartDashBoard apiData={lineData} />
            </Grid>
            <Grid sx={4}>
              <BarChartDashboard data={barData} />
              <ProgressChart
                balance={marketplaceProject.balance}
                target={marketplaceProject.target}
              />
            </Grid>
          </Grid> */}
        </>
      )}
    </>
  );
}

export default MarketplaceProjectPreview;
