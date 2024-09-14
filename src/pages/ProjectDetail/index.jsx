import React from 'react'
import Grid from '@mui/material/Grid2';
import ProjectImages from '../../components/ProjectImages';

const ProjectDetail = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={6.5} sx={{ mt: '0 !important' }}>
      <ProjectImages/>
      </Grid>
      <Grid size={5.5} sx={{ mt: '0 !important' }} paddingLeft={5}>
        <div>Hello</div>
      </Grid>
    </Grid>
  )
}

export default ProjectDetail
