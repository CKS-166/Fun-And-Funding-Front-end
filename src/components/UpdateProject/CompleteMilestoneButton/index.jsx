import React from 'react'
import { Button } from '@mui/material'
import { FaPlus } from 'react-icons/fa'
import projectMilestoneApiInstace from '../../../utils/ApiInstance/projectMilestoneApiInstance'
import Swal from 'sweetalert2'
const CompleteMilestoneButton = ({submit, status, pmId, render }) => {
    const processing = 1;
    const submitted = 5;
    console.log(status)
    console.log(pmId)
    const submitMilestone = async () => {
        try {
            await submit();
            await projectMilestoneApiInstace.put("/",
                { projectMilestoneId: pmId, status: submitted })
                .then(res => {
                    console.log(res.data);
                    Swal.fire({
                        icon: 'success',
                        title: 'Milestone submitted successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Milestone submitted successfully',
                showConfirmButton: false,
                timer: 1500
            })
        }finally{
            render()
        }
    }
    return (
        <>
            <Button
                disabled={!status === processing}
                variant="contained" component="label"
                onClick={submitMilestone}
                sx={{
                    backgroundColor: '#1BAA64', textTransform: 'none', fontWeight: '600'
                    , marginLeft: '30rem'
                }}
                startIcon={<FaPlus />}
            >
                Complete Milestone
            </Button>

        </>
    )
}

export default CompleteMilestoneButton