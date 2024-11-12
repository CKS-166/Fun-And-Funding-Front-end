import Grid from '@mui/material/Grid2';
import React, { useState } from 'react';
import { Box, Typography, Button, TextField, InputAdornment, Backdrop, CircularProgress } from '@mui/material';
import kuru from '../../../assets/images/ktm.jpg';
import './index.css';
import PackageItem from './PackageItem';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
const PackageReward = ({ packageList, reloadDetail, isButtonActive }) => {
  const token = Cookies.get("_auth");

  const number = 30000000;
  const [donatedMoney, setDonatedMoney] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const handleDonateFree = async (item) => {
    let donateBody = {
      userId: "8C94B07C-209B-4E11-A1B6-BC59E0B29976",
      packageId: item.id,
      donateAmount: donatedMoney,
    };

    try {
      await axios
        .post("https://localhost:7044/api/package-backers", donateBody,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          Swal.fire({
            title: "Donation Success",
            text: "Thank you for your donation!",

            icon: "success",
          });
          reloadDetail();
        });
    } catch (error) {
      setIsLoading(false);
      if(error.status === 401){
                    
        Swal.fire({
            title: "Donation Failed",
            text: "Please Login in Backer role",
            icon: "error"
        })
    }else { 
        Swal.fire({
            title: "Donation Failed",
            text: error.response.data._message,
            icon: "error"
        })
    }
      console.log(error);
    }
  };

  const handlePackageDonate = async (item) => {
    setIsLoading(true);
    let donateBody = {
      userId: "b3523de5-f1d2-4cc9-8306-fa4c0ec6d28c",
      packageId: item.id,
      donateAmount: item.requiredAmount,
    };

    console.log(donateBody);
    try {
      await axios
        .post("https://localhost:7044/api/package-backers", donateBody,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          Swal.fire({
            title: "Donation Success",
            text: "Thank you for your donation!",

            icon: "success",
          });
          reloadDetail();
        });
    } catch (error) {
      setIsLoading(false);
      if(error.status === 401){
                    
        Swal.fire({
            title: "Donation Failed",
            text: "Please Login in Backer role",
            icon: "error"
        })
    }else { 
        Swal.fire({
            title: "Donation Failed",
            text: error.response.data._message,
            icon: "error"
        })
    }
      console.log(error);
    }

    console.log("abcd");
  };
  const sortedPackageList = packageList.sort((a, b) => {
    // First, check if either packageType is 0
    if (a.packageTypes === 0 && b.packageType !== 0) {
      return -1; // a comes before b
    } else if (a.packageTypes !== 0 && b.packageType === 0) {
      return 1; // b comes before a
    } else {
      // If both packageType are not 0, sort by ascending order of packageType
      return a.packageTypes - b.packageTypes;
    }
  });
  return (
    <div>
      <Grid
        container
        spacing={1}
        sx={{ marginTop: "78px", marginBottom: "100px" }}
      >
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 100,
          }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {sortedPackageList.map((item, index) => (
          <>
            {item.packageTypes == 0 ? (
              <Grid size={6} sx={{ overflowY: "auto" }}>
                <Box
                  className="package-reward"
                  sx={{ height: "407px", overflowY: "auto" }}
                >
                  <Box sx={{ display: "flex", padding: "34px" }}>
                    <Box className="package-image" sx={{ width: "50%" }}>
                      <img src={kuru} />
                    </Box>
                    <Box sx={{ width: "50%" }}>
                      <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "400",
                          opacity: 0.5,
                          marginTop: "10px",
                        }}
                      >
                        {item.description}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "700",
                          marginTop: "10px",
                          border: "1px solid #1BAA64",
                        }}
                      >
                        <Box sx={{ width: 500, maxWidth: "100%" }}>
                          <TextField
                            fullWidth
                            id="input-with-icon-adornment"
                            value={donatedMoney}
                            onChange={(e) => setDonatedMoney(e.target.value)}
                            slotProps={{
                              input: {
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Box>VND</Box>
                                  </InputAdornment>
                                ),
                              },
                            }}
                          />
                        </Box>
                      </Typography>
                      <Button
                        sx={{
                          width: "100%",
                          whiteSpace: "nowrap",
                          background: "#1BAA64",
                          fontWeight: "bold",
                          py: 1,
                          borderRadius: "8px",
                          color: "#FFFFFF",
                          marginTop: "10px",
                        }}
                        disabled={isButtonActive}
                        className="pledge-btn"
                        onClick={() => handleDonateFree(item)}
                      >
                        Pledge
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ) : (
              <Grid key={index} size={6} sx={{ overflowY: "auto" }}>
                <Box
                  className="package-reward"
                  sx={{ height: "407px", overflowY: "auto" }}
                >
                  <Box sx={{ display: "flex", padding: "34px" }}>
                    <Box className="package-image" sx={{ width: "50%" }}>
                      <img src={kuru} />
                    </Box>
                    <Box sx={{ width: "50%" }}>
                      <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "700",
                          color: "#1BAA64",
                          marginTop: "10px",
                        }}
                      >
                        {item.requiredAmount.toLocaleString("de-DE")}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "400",
                          opacity: 0.5,
                          marginTop: "10px",
                        }}
                      >
                        {item.description}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "700",
                          marginTop: "10px",
                        }}
                      >
                        {item.limitQuantity}{" "}
                        <span style={{ fontWeight: "400" }}>are left</span>
                      </Typography>
                      <Button
                        sx={{
                          width: "100%",
                          whiteSpace: "nowrap",
                          background: "#1BAA64",
                          fontWeight: "bold",
                          py: 1,
                          borderRadius: "8px",
                          color: "#FFFFFF",
                          marginTop: "10px",
                        }}
                        className="pledge-btn"
                        disabled={isButtonActive}
                        onClick={() => handlePackageDonate(item)}
                      >
                        Pledge
                      </Button>
                    </Box>
                  </Box>
                  <Box className="package-item" sx={{ padding: "34px" }}>
                    <Grid container spacing={2}>
                      {item.rewardItems.map((rItem, index) => (
                        <Grid size={6}>
                          <PackageItem item={rItem} />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            )}
          </>
        ))}
      </Grid>
    </div>
  );
};

export default PackageReward;
