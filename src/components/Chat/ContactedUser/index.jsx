import React from "react";
import { Avatar, Typography } from "@mui/material";

function ContactedUser({ user, isSelected, onSelect }) {
  return (
    <div
      className={`flex flex-row p-4 gap-x-4 ${
        isSelected ? "bg-[#d3d3d380]" : "bg-transparent"
      }  hover:bg-[#d3d3d380] hover:cursor-pointer rounded-[0.625rem] w-full`}
      onClick={onSelect}
    >
      <div>
        <Avatar
          alt={user.name}
          src={user.avatar}
          sx={{ width: 56, height: 56 }}
        />
      </div>
      <div className="flex flex-col justify-between w-full">
        <Typography sx={{ fontSize: "1.125rem", fontWeight: "600" }}>
          {user.name}
        </Typography>
        <div className="flex flex-row justify-between">
          <Typography
            sx={{
              fontSize: "0.875rem",
              color: "#9d9e9f",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 1,
              textOverflow: "ellipsis",
              whiteSpace: "normal", // Allows text to wrap
              wordBreak: "break-word",
              width: "50%",
            }}
          >
            {user.latestMessage}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.875rem",
              color: "#9d9e9f",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 1,
              textOverflow: "ellipsis",
              whiteSpace: "normal", // Allows text to wrap
              wordBreak: "break-word",
              textAlign: "right",
            }}
          >
            {`${new Date(user.createdDate).toLocaleString()}`}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default ContactedUser;
