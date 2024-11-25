/* eslint-disable no-unused-vars */
import { Box, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CouponsTable from "../../../components/CouponsTable";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import couponApiInstace from "../../../utils/ApiInstance/couponApiInstance";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useLoading } from "../../../contexts/LoadingContext";

const MarketplaceProjectCoupon = () => {
  const [data, setData] = useState([]);
  const [couponFile, setCouponFile] = useState(null);
  const { id } = useParams();
  const { isLoading, setIsLoading } = useLoading();
  const token = Cookies.get("_auth");

  const fetchData = async () => {
    try {
      const response = await couponApiInstace.get(`/all/${id}`);
      console.log(response.data);
      setData(response.data._data);
    } catch (error) {
      console.log(error);
    }
  };

  const mappingData = data.map((item) => ({
    Id: item.id,
    "Coupon Key": item.couponKey,
    "Coupon Name": item.couponName,
    "Discount Rate": item.discountRate,
    Status: item.status === 1 ? "Enabled" : "Disabled",
  }));

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCouponFile(file);
      console.log(file);
      e.target.value = null;
    }
  };

  const handleSave = async () => {
    if (couponFile) {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("formFile", couponFile);

      try {
        const response = await couponApiInstace.post(
          `?projectId=${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          Swal.fire({
            title: "Success",
            text: response.data._message[0],
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });

          fetchData();
          setCouponFile(null);
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          Swal.fire({
            title: "Error",
            text: error.response.data.message,
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div className="m-2 p-4">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "row",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <input
              type="file"
              onChange={(e) => handleFileChange(e)}
              style={{ display: "none" }}
              id="file-input"
            />
            <Button
              variant="contained"
              onClick={() => document.getElementById("file-input").click()}
              sx={{
                backgroundColor: "#1BAA64",
                textTransform: "none",
                fontWeight: "600",
              }}
              startIcon={<AddCircleIcon />}
            >
              Import File
            </Button>
            <a href={couponFile ? URL.createObjectURL(couponFile) : ""}>
              {couponFile ? couponFile.name : ""}
            </a>
          </Box>
          <Box>
            <Button
              variant="contained"
              onClick={() => {
                handleSave();
              }}
              sx={{
                backgroundColor: "#1BAA64",
                textTransform: "none",
                fontWeight: "600",
                display: `${couponFile ? "block" : "none"}`,
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
        <h1 className="text-3xl font-bold mb-6 text-center text-[#1BAA64]">
          Coupons
        </h1>
        <CouponsTable data={mappingData} />
      </div>
    </>
  );
};

export default MarketplaceProjectCoupon;
