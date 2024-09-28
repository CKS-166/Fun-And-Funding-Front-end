import React from 'react'
import { Typography, Box } from '@mui/material'
const ProjectIntro = ({intro}) => {
  return (
    <Box>
        <Box className="w-[800px] p-[45px]">
            {intro ? <Typography>{intro}</Typography> : <Typography>Project Introduction for this project has not been published</Typography>}
            
        </Box>
    </Box>
  )
}

export default ProjectIntro
