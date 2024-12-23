import CachedIcon from '@mui/icons-material/Cached';
import { Button, Grid2, Typography } from "@mui/material";
import CategoryTable from '../../../components/AdminDashboard/CategoryTable';
import PlatformRevenue from '../../../components/AdminDashboard/PlatformRevenue';
import RevenueLineChart from '../../../components/AdminDashboard/RevenueLineChart';
import StatisticCard from '../../../components/AdminDashboard/StatisticCard';
import TransactionTable from '../../../components/AdminDashboard/TransactionTable';


const Dashboard = () => {

  return (
    <div className="mx-auto max-w-screen-xl px-[2rem] my-8">
      <div className="flex justify-between flex-row items-center">
        <div className="flex flex-col">
          <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, mb: '0.5rem' }}>Welcome, Administrator</Typography>
          <Typography sx={{ fontSize: '1rem', fontWeight: 400, mb: '0.5rem' }}>Track your website usage and components today</Typography>
        </div>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#1BAA64", textTransform: "none", fontWeight: '700' }}
          startIcon={<CachedIcon />}
        >
          Refresh Data
        </Button>
      </div>
      <Grid2 container columnSpacing={4} rowSpacing={3} sx={{ mt: '2rem' }}>
        <Grid2 size={8}>
          <>
            <Grid2 container columnSpacing={2} rowSpacing={0}>
              <Grid2 size={8}>
                <PlatformRevenue />
              </Grid2>
              <Grid2 size={4} height={"100%"}>
                <StatisticCard content={"Users"} />
              </Grid2>
              <Grid2 size={4}>
                <StatisticCard content={"Crowdfunding"} />
              </Grid2>
              <Grid2 size={4}>
                <StatisticCard content={"Milestones"} />
              </Grid2>
              <Grid2 size={4}>
                <StatisticCard content={"Marketplace"} />
              </Grid2>
              <Grid2 size={12}>
                <RevenueLineChart />
              </Grid2>
            </Grid2>
          </>
        </Grid2>
        <Grid2 size={4}>
          <TransactionTable />
          <CategoryTable />
        </Grid2>
      </Grid2>
    </div>
  )

}

export default Dashboard