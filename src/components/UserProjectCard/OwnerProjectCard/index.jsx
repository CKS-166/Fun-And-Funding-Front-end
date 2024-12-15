import { FormControl, MenuItem, Select, Typography, Modal, Box } from "@mui/material";
import { alpha } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import OrderMarketDetail from "../../OrderCard/OrderMarketDetail";
const projectStatus = {
  0: { name: "Deleted", color: "var(--red)" },
  1: { name: "Pending", color: "#FFC107" },
  2: { name: "Processing", color: "#2196F3" },
  3: { name: "Funded Successful", color: "var(--primary-green)" },
  4: { name: "Successful", color: "var(--primary-green)" },
  5: { name: "Failed", color: "var(--red)" },
  6: { name: "Rejected", color: "var(--red)" },
  7: { name: "Approved", color: "var(--primary-green)" },
  8: { name: "Withdrawed", color: "#9C27B0" },
  9: { name: "Refunded", color: "#FF5722" },
  10: { name: "Reported", color: "#E91E63" },
};

function OwnerProjectCard({ project, projectType }) {
  const [selectedValue, setSelectedValue] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [details, setDetails] = useState([]);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  console.log(project);
  const fetchMarketOrder = () => {
    axios
      .get(`https://localhost:7044/api/order-details/${project.id}/purchases`)
      .then((res) => {
        console.log(res);
        setDetails(res.data._data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    projectType != "Funding" && fetchMarketOrder();
  }, [])

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    // border : 'none !important',
  };
  return (
    <div className="flex items-center rounded-md gap-[2rem]">
      <div className="w-[10rem] h-[10rem] bg-[#EAEAEA] flex justify-center items-center rounded-lg">
        <img
          src={
            projectType == "Funding"
              ? project?.fundingFiles?.find(
                  (p) => p.filetype == 2 && p.isDeleted == false
                ).url
              : project?.marketplaceFiles?.find(
                  (p) => p.fileType == 2 && p.isDeleted == false
                ).url
          }
          style={{
            width: "10rem",
            height: "10rem",
            objectFit: "cover",
            borderRadius: "5px",
          }}
        />
      </div>
      <div className="flex-grow !w-[12rem] h-fit">
        <div className="flex items-center mb-[0.5rem] gap-[1rem]">
          <a
            href={
              projectType == "Funding"
                ? `/funding-detail/${project.id}`
                : `/marketplace-detail/${project.id}`
            }
          >
            <Typography
              sx={{
                color: "#2F3645",
                width: "25rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitBoxOrient: "vertical",
              }}
              className="user-project-card"
            >
              {project.name}
            </Typography>
          </a>
          <div className="flex items-center">
            <span
              className="ml-[1rem] bg-[#1BAA64] text-[0.75rem] text-[#EAEAEA] px-[0.5rem] py-[0.25rem] rounded font-semibold"
              style={{ backgroundColor: projectStatus[project.status].color }}
            >
              {projectStatus[project.status].name}
            </span>
          </div>
        </div>
        <Typography
          sx={{
            color: "#2F3645",
            fontWeight: "600",
            fontSize: "1rem",
            mb: "1.25rem",
          }}
        >
          by <span className="text-[#1BAA64]">{project?.user.userName}</span>
        </Typography>
        <Typography
          sx={{
            color: "#2F3645",
            fontWeight: "300",
            fontSize: "1rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          {project.description}
        </Typography>
      </div>
      <FormControl
        sx={{
          minWidth: "8rem",
          height: "2.5rem",
          ".MuiOutlinedInput-notchedOutline": { border: "0 !important" },
          "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            border: "0 !important",
          },
          "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              border: "0 !important",
            },
        }}
      >
        <Select
          value={selectedValue}
          onChange={handleChange}
          displayEmpty
          renderValue={(value) =>
            value ? (
              <Typography sx={{ color: "var(--black)" }}>Action</Typography>
            ) : (
              <Typography sx={{ color: "var(--black)" }}>Action</Typography>
            )
          }
          sx={{
            backgroundColor: "#EAEAEA",
            border: "none !important",
            display: "flex",
            alignItems: "center",
            "& .MuiSelect-select": {
              padding: "0 1rem",
              display: "flex",
              alignItems: "center",
              height: "2.5rem",
            },
            "&:hover": {
              backgroundColor: alpha("#EAEAEA", 0.85),
            },
            height: "2.5rem",
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
                minWidth: "12rem",
                marginTop: "0.5rem",
              },
            },
          }}
        >
          <MenuItem
            value="edit"
            onClick={() =>
              window.open(
                `/account/${
                  projectType == "Funding" ? "projects" : "marketplace-projects"
                }/update/${project.id}/basic-info`,
                "_blank"
              )
            }
          >
            <Typography>View Details</Typography>
          </MenuItem>
          {projectType != "Funding" && (
            <>
              <MenuItem value="view" onClick={handleOpen}>
                <Typography>View orders</Typography>
              </MenuItem>
              <Modal
                open={open}
                onClose={handleClose}
                disableAutoFocus={true}
              >
                <Box sx={style}>
                  <OrderMarketDetail details={details}/>
                </Box>
              </Modal>
            </>
          {(project.status === 1 ||
            (project.status === 6 && projectType !== "Funding")) && (
            <MenuItem value="remove">
              <Typography>Delete Project</Typography>
            </MenuItem>
          )}

          {project.status == 4 && (
            <MenuItem
              value="publish"
              onClick={() =>
                window.open(
                  `/request-marketplace-project/${project.id}/basic-info`,
                  "_blank"
                )
              }
            >
              <Typography>Publish To Marketplace</Typography>
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
}

export default OwnerProjectCard;
