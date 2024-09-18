import React from 'react'
import {Card , CardContent, CardActions, CardMedia,
     Typography, Divider, Button} from '@mui/material';

const PackageSide = () => {
    return (
        <div>
            <Card sx={{ borderRadius: 0, 
                border: ".1rem solid rgba(0, 0, 0, 0.12)", mb: 3, mx: 1, position: 'relative', width : '307px'
                ,height : '399px' }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    image="https://t4.ftcdn.net/jpg/03/03/46/39/360_F_303463981_i1CiZU5VYclryudt7VI7YSEDw9mgkSqJ.jpg"
                    sx={{ height: "9rem" }}
                />
                <Typography
                    sx={{
                        fontWeight: 'bold', fontSize: '18px',
                        color: 'white', position: 'absolute',
                        top: '3.5rem', left: '4.5rem'
                    }}
                >
                    3000 VND
                </Typography>
                <CardContent>
                    <Typography
                        gutterBottom
                        sx={{ textAlign: "left", fontSize: "18px", fontWeight : 600 }}
                    >
                        Package 01
                    </Typography>
                    <Typography
                        gutterBottom
                        sx={{ fontWeight: "bold", textAlign: "left", fontSize: "16px", color : '#1BAA64' }}
                    >
                        300 VND
                    </Typography>
                    <Typography
                        gutterBottom
                        sx={{ textAlign: "left", fontSize: "10px", opacity : 0.5 }}
                    >
                        Special Edition of Castles of Burgundy, including all Stretch Goals, high-quality neoprene mat, Acrylic Hexes upgrade, and Acrylic Tiles upgrade
                    </Typography>

                    <Typography sx={{fontSize : '12px', fontWeight : 500, marginTop : '13px'}}>
                        50 out of 60 are left
                    </Typography>
                    <Divider />

                </CardContent>
                <CardActions>
                    <Button variant="contained" sx={{width : '286px', marginTop : '14px'
                        , backgroundColor : '#1BAA64', fontWeight : 700}}>
                        Pledge 10.000 VND
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default PackageSide
