import React,{useState} from 'react'
import {
    Card, CardContent, CardActions, CardMedia,
    Typography, Divider, Button
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import PackageModal from '../PackageModal';
const PackageSide = ({ packageList, reloadDetail }) => {
    const fixedPackageList = packageList && packageList.filter((item) => item.packageTypes === 1)
    const [isLoading, setIsLoading] = useState(false)

    const [openModal, setOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const handleOpen = (item) => {
        setSelectedItem(item);
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
        setSelectedItem(null);
    };
    const handlePackageDonate = async (item) => {
        setIsLoading(true);
            let donateBody =
            {
                "userId": "8C94B07C-209B-4E11-A1B6-BC59E0B29976",
                "packageId": item.id,
                "donateAmount": item.requiredAmount
            }
            
            console.log(donateBody)
            try{
                await axios.post('https://localhost:7044/api/PackageBackers', donateBody).then(res => {
                    console.log(res)
                    setIsLoading(false);
                    Swal.fire({
                        title: "Donation Success",
                        text: "Thank you for your donation!",
                        
                        icon: "success"
                    });
                    reloadDetail()
                })
            }catch(error){
                console.log(error)
            }
            
            console.log('abcd')
    }
    return (
        <div>
            {fixedPackageList && fixedPackageList.map((item, index) => (
                <Card sx={{
                    borderRadius: 0,
                    border: ".1rem solid rgba(0, 0, 0, 0.12)", mb: 3, mx: 1, position: 'relative', width: '307px'
                    , height: '399px'
                }}
                key={index}>
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
                        {item.requiredAmount.toLocaleString('de-DE')} VND
                    </Typography>
                    <CardContent>
                        <Typography
                            gutterBottom
                            sx={{ textAlign: "left", fontSize: "18px", fontWeight: 600 }}
                        >
                            {item.name}
                        </Typography>
                        <Typography
                            gutterBottom
                            sx={{ fontWeight: "bold", textAlign: "left", fontSize: "16px", color: '#1BAA64' }}
                        >
                            {item.requiredAmount.toLocaleString('de-DE')} VND
                        </Typography>
                        <Typography
                            gutterBottom
                            sx={{ textAlign: "left", fontSize: "10px", opacity: 0.5 }}
                        >
                            {item.description}
                        </Typography>

                        <Typography sx={{ fontSize: '12px', fontWeight: 500, marginTop: '13px' }}>
                            {item.limitQuantity} items are left
                        </Typography>
                        <Divider />

                    </CardContent>
                    <CardActions>
                        <Button variant="contained" sx={{
                            width: '286px', marginTop: '14px'
                            , backgroundColor: '#1BAA64', fontWeight: 700
                        }}
                        // onClick = {() => handlePackageDonate(item)}
                        onClick={() => handleOpen(item)}>
                            Pledge {item.requiredAmount.toLocaleString('de-DE')} VND
                        </Button>
                    </CardActions>
                </Card>
            ))}
             {selectedItem && (
                <PackageModal
                    open={openModal}
                    handleClose={handleClose}
                    item={selectedItem}
                    onDonate={handlePackageDonate}
                />
            )}
        </div>
    )
}

export default PackageSide
