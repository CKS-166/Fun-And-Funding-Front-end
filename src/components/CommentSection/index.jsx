import React, { useState } from 'react'
import CommentBar from './CommentBar'
import { Box, Typography, Avatar, TextField, Button } from '@mui/material';
const CommentSection = ({ isBacker }) => {
  const [comment, setComment] = useState("");
  return (
    <>
      <Box>
        {isBacker ?
          <Box sx={{
            background: '#FFFFFF'
            , borderRadius: '5px', padding: '22px', marginBottom: '15px',
            border: '1px solid rgba(0, 0, 0, 0.3)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ width: '60px', height: '60px', marginRight: '10px' }}>H</Avatar>
              <Box sx={{ marginRight: '10px' }}>
                <Typography sx={{ fontSize: '18px', fontWeight: '500' }}>
                  SuperIdol123
                </Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: '400', color: '#1BAA64' }}>
                  9/9/2024
                </Typography>
              </Box>

            </Box>
            <Box sx={{ margin: '20px 10px' }}>
              <TextField
                id="outlined-multiline-static"
                placeholder='Write your comment here...'
                sx={{ width: '600px' }}
                multiline
                rows={2}
                value={comment}
              />
              <Box sx={{display : 'flex', justifyContent : 'flex-end', width : '600px'}}>
                <Button sx={{ color: '#FFFFFF', background: '#1BAA64', width : '143px', fontSize : '12px',
                  height : '21px', marginTop : '8px'
                 }}>
                  Comment
                </Button>
              </Box>
            </Box>
          </Box>
          : <CommentBar />}
        <CommentBar />
      </Box>

    </>
  )
}

export default CommentSection