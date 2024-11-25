/* eslint-disable no-unused-vars */
import CouponsTable from "../../../components/CouponsTable";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import couponApiInstace from "../../../utils/ApiInstance/couponApiInstance";

const MarketplaceProjectCoupon = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
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
    Status: item.status === 1 ? "Active" : "1",
  }));
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="m-2 p-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#1BAA64]">
          Coupons
        </h1>
        <CouponsTable data={mappingData} />
      </div>
    </>
  );
};

export default MarketplaceProjectCoupon;
