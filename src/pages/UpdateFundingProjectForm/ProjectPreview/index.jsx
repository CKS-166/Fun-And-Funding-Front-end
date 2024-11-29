import React, { useState, useEffect } from 'react'
import fundingProjectApiInstance from '../../../utils/ApiInstance/fundingProjectApiInstance';
import { useParams } from 'react-router';
import { Backdrop, CircularProgress } from '@mui/material';
import ProgressChart from '../../../components/Chart/ProgressChart';
import LineChartDashBoard from '../../../components/Chart/LineChartDashboard/index.jsx';
import packageBackerApiInstance from '../../../utils/ApiInstance/packageBackerApiInstance';
import StatBox from '../../../components/Chart/StatBox/index.jsx';
import { FaWallet, FaEnvelope } from "react-icons/fa";
import Grid from '@mui/material/Grid2';
import BarChartDashboard from '../../../components/Chart/BarChartDashboard/index.jsx';
import transactionApiInstance from '../../../utils/ApiInstance/transactionApiInstance';
import TransactionTable from '../../../components/TransactionTable/index.jsx';
function ProjectPreview() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(false);
    const [lineData, setLineData] = useState([]);
    const [barData, setBarData] = useState([]);
    const [transactionData, setTransactionData] = useState([]);
    
    useEffect(() => {
        getProject();
        console.log("a")
    }, [])
    // fetch project data
    const getProject = async () => {
        setLoading(true);
        try {
            const response = await fundingProjectApiInstance.get(`/${id}`)
            setProject(response.data._data);
            console.log(response.data);
            fetchLineChart(response.data._data.id);
            fetchBarData(response.data._data.id);
            fetchTransaction()
        } catch (error) {
            console.error('Error fetching project:', error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }
    //fetch line chart data
    const fetchLineChart = async (projectId) => {
        try {
            const res = await packageBackerApiInstance.get(`/project-backers?projectId=${projectId}`);
            console.log(res);

            setLineData(res.data.result._data);
        } catch (error) {
            console.error('Error fetching line chart data:', error);
        }
    };
    //fetch bar data
    const fetchBarData = async (projectId) => {
        try {
            const res = await packageBackerApiInstance.get(`/package-backer-count?projectId=${projectId}`);
            console.log(res);
            setBarData(res.data.result._data);
        } catch (error) {
            console.error('Error fetching bar chart data:', error);
        }
    }
    //fetch transaction data
    const fetchTransaction = async () => {
        try {
            const res = await transactionApiInstance.get(`?projectId=${id}`);
            console.log(res);
            setTransactionData(res.data._data)
        } catch (error) {
            console.error('Error fetching transaction data:', error);
        }
    }
    return (
        <>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {/* statbox */}
            {project && (
                <>
                    <Grid container spacing={4} justifyContent="center" m="2rem">
                        <Grid item xs={12} sm={6} md={3}>
                            <StatBox
                                title={project.wallet.balance.toLocaleString("en-US")}
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
                            <TransactionTable transactions={transactionData} />
                        </Grid>
                        <Grid sx={4}>
                            <BarChartDashboard data={barData} />
                            <ProgressChart balance={project.balance} target={project.target} />
                        </Grid>

                    </Grid>

                </>
            )}
        </>

    )
}

export default ProjectPreview