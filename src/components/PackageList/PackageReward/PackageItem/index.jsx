import { Box, Typography } from '@mui/material'
import React from 'react'
const PackageItem = ({ item }) => {
  return (
    <>
      <Box sx={{ display: 'flex', width: '283px', background: '#F5F7F8', borderRadius: '10px', padding: '10px', alignItems: 'center' }}>
        <Box className='reward-image' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5px' }}>
          {item.imageUrl && <img src={item.imageUrl} style={{ width: '40px', height: '40px' }} />}
        </Box>
        <Box>
          <Typography sx={{ fontSize: '10px', fontWeight: '400' }}>
            {item.name}
          </Typography>
          <Typography sx={{ fontSize: '8px', fontWeight: '200', color: '#1BAA64', marginTop: '5px' }}>{item.quantity} item(s)</Typography>
        </Box>
      </Box>
    </>
  )
}

export default PackageItem