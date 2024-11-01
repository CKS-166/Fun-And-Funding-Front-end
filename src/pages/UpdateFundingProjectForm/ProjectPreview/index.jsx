import React, { useState, useEffect } from 'react'
import fundingProjectApiInstance from '../../../utils/ApiInstance/fundingProjectApiInstance';
import { useParams } from 'react-router';
import { Backdrop, CircularProgress } from '@mui/material';
import ProgressChart from '../../../components/Chart/ProgressChart';
function ProjectPreview() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getProject();
    }, [])
    const getProject = async () => {
        setLoading(true);
        try {
            const response = await fundingProjectApiInstance.get(`/${id}`)
            setProject(response.data._data);
            setLoading(false);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching project:', error);
            setLoading(false);
        }
    }
    return (
        <>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div style={{ width: '30%', padding: '10px' }}>
                    <ProgressChart balance={project?.wallet?.balance} target={project?.target}/>
                </div>
                <div style={{ width: '30%', padding: '10px' }}>
                    {/* <PackageDistributionChart /> */}
                </div>
                <div style={{ width: '30%', padding: '10px' }}>
                    {/* <FundingTimelineChart /> */}
                </div>
            </div>

        </>

    )
}

export default ProjectPreview