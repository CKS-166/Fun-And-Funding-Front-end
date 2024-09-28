import { Outlet } from "react-router";
import React from "react";
import { Avatar, Typography } from "@mui/material";

function ProfileLayout() {
  return (
    <div>
      <div className="mt-8 mx-[5.5rem] h-[20rem] bg-[#EAEAEA] rounded-[0.625rem]">
        <div className="mx-[8rem] py-[3rem] flex justify-between gap-[6rem]">
          <div className="">
            <Avatar alt="User" sx={{ width: "14rem", height: "14rem" }} />
          </div>
          <div className="w-full py-[2rem]">
            <Typography
              sx={{
                fontWeight: "700",
                marginBottom: "0.25rem",
                fontSize: "2rem",
                color: "#2F3645",
              }}
            >
              Do Yoo Lim
            </Typography>
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: "1.25rem",
                color: "#2F3645",
                marginBottom: "4.5rem",
              }}
            >
              doyoolim@gmail.com
            </Typography>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default ProfileLayout;
