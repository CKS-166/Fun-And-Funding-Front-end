import React, { useState, useEffect } from "react";
import fundingProjectApiInstance from "../../../utils/ApiInstance/fundingProjectApiInstance.jsx";
import { useParams } from "react-router";
import { Backdrop, CircularProgress,Box } from "@mui/material";
import ProgressChart from "../../../components/Chart/ProgressChart/index.jsx";
import MarketLineChart from "../../../components/Chart/MarketLineChart/index.jsx";
import packageBackerApiInstance from "../../../utils/ApiInstance/packageBackerApiInstance.jsx";
import StatBox from "../../../components/Chart/StatBox/index.jsx";
import { FaWallet, FaEnvelope } from "react-icons/fa";
import Grid from "@mui/material/Grid2";
import BarChartDashboard from "../../../components/Chart/BarChartDashboard/index.jsx";
import { useUpdateMarketplaceProject } from "../../../contexts/UpdateMarketplaceProjectContext.jsx";
import marketplaceProjectApiInstace from "../../../utils/ApiInstance/marketplaceProjectApiInstance.jsx";
import orderApiInstace from "../../../utils/ApiInstance/orderApiInstance.jsx";
import couponApiInstace from "../../../utils/ApiInstance/couponApiInstance.jsx";
import { RiCoupon5Fill } from "react-icons/ri";
import MarketBarChart from "../../../components/Chart/MarketBarChart/index.jsx";
import { RiBillLine } from "react-icons/ri";
function MarketplaceProjectPreview() {
  const { id } = useParams();
  const { marketplaceProject, setMarketplaceProject, edited, setEdited } =
  useUpdateMarketplaceProject();
  const [loading, setLoading] = useState(false);
  const [lineData, setLineData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [couponCount, setCouponCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [activeCoupons,setActiveCoupons] = useState(0);
  //fetch line chart data
  const fetchLineChart = async (projectId) => {
    try {
      const res = await orderApiInstace.get(`group-orders?id=${projectId}`)
      .then(res => {
        console.log(res);
        setLineData(res.data._data)
        setOrdersCount(res.data._data.length)
      });
    } catch (error) {
      console.error("Error fetching line chart data:", error);
    }
  };
  console.log(marketplaceProject)
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

  const fetchCoupon = async (projectId) => {
    try {
      const res = await couponApiInstace.get(`all/${projectId}`);
      setCouponCount(res.data._data.length);
      const activeCoupons = res.data._data.length > 0 ?
      coupons.filter(coupon => coupon.status === 1) : [];
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    }
  }
  const couponsXAxis = ['Active', 'Total'];
  useEffect(() => {
     fetchLineChart(id);
     fetchCoupon(id);
  },[marketplaceProject])
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
          <Grid container spacing={4} justifyContent="center" m="2rem">
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
                title={couponCount}
                subtitle="Total Coupons"
                icon={<RiCoupon5Fill size={26} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatBox
                title={ordersCount}
                subtitle="Total Orders"
                icon={<RiBillLine size={26} />}
              />
            </Grid>
            
          </Grid>
          <Grid container spacing={2} justifyContent={"center"} m="2rem">
            <Grid sx={8}>
              <Box sx={{height: '10rem' }}>
                <MarketLineChart apiData={lineData} />
              </Box>
            </Grid>
            <Grid sx={4}>
              <MarketBarChart x={couponsXAxis} y={[activeCoupons,couponCount]}  />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export default MarketplaceProjectPreview;
