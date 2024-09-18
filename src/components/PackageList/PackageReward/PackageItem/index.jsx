import React from 'react'
import { Box, Typography } from '@mui/material'
import kuru from '../../../../assets/ktm.jpg'
const PackageItem = () => {
  return (
    <>
        <Box sx={{display:'flex', width : '283px', background : '#F5F7F8', borderRadius : '10px', padding:'10px'}}>
            <Box className='reward-image' sx={{display : 'flex' , justifyContent :'center', alignItems : 'center', padding:'5px'}}>
                <img src={kuru} style={{width : '40px', height : '40px'}}/>
            </Box>
            <Box>
                <Typography sx={{ fontSize: '10px', fontWeight: '400' }}>
                    Castles of Burgundy Special Edition (incl. Stretch Goals)
                </Typography>
                <Typography sx={{ fontSize: '8px', fontWeight: '200', color: '#1BAA64', marginTop: '5px' }}>300000000</Typography>
            </Box>
        </Box>
    </>
  )
}

export default PackageItem