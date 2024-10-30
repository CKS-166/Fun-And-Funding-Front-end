import React, { useState, useEffect } from "react";
import { Button, Backdrop, CircularProgress, Box } from "@mui/material";
import axios from "axios";
import MilestoneQuill from "../../../../components/UpdateProject/MilestoneQuill";
import UploadButton from "../../../../components/UpdateProject/UploadFiles/UploadButton";
import FileUploadDropdown from "../../../../components/UpdateProject/UploadFiles/FileUploadDropdown";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

const UpdateMilestone = ({ milestones, render }) => {
  
  const [milestoneData, setMilestoneData] = useState([]);
  const [anchorEls, setAnchorEls] = useState({});
  const [loading, setLoading] = useState(true);
  console.log(milestones)
  useEffect(() => {
    if (milestones && milestones.length > 0) {
      // Initialize milestone data if milestones are available
      const initialData = milestones.map((milestone) => ({
        id: milestone.id,
        updateDate: new Date().toISOString(),
        content: milestone.content || "",
        requirementStatus: milestone.requirementStatus || 0,
        requirementFiles: milestone.requirementFiles || [],
        addedFiles: [],
      }));
      setMilestoneData(initialData);
      setLoading(false); // Data is loaded, stop loading
    } else if (milestones && milestones.length === 0) {
      setLoading(false); // No milestones found, stop loading
    }
  }, [milestones]);

  const handleQuillChange = (value, index) => {
    const updatedMilestones = [...milestoneData];
    updatedMilestones[index].content = value;
    setMilestoneData(updatedMilestones);
  };

  const handleFilesSelected = (selectedFiles, index) => {
    const updatedMilestones = [...milestoneData];
    updatedMilestones[index].addedFiles.push(...selectedFiles);
    setMilestoneData(updatedMilestones);
  };

  const openDropdown = (event, index) => {
    setAnchorEls((prev) => ({
      ...prev,
      [index]: event.currentTarget,
    }));
  };

  const closeDropdown = (index) => {
    setAnchorEls((prev) => ({
      ...prev,
      [index]: null,
    }));
  };

  const handleRemoveFile = (fileIndex, milestoneIndex, fileSource) => {
    const updatedMilestones = [...milestoneData];
    if (fileSource === "addedFiles") {
      updatedMilestones[milestoneIndex].addedFiles.splice(fileIndex, 1);
    } else if (fileSource === "requirementFiles") {
      updatedMilestones[milestoneIndex].requirementFiles[fileIndex].IsDeleted = true;
    }
    setMilestoneData(updatedMilestones);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = new FormData();
    milestoneData.forEach((milestone, i) => {
      data.append(`request[${i}].Id`, milestone.id);
      data.append(`request[${i}].RequirementStatus`, milestone.requirementStatus);
      data.append(`request[${i}].UpdateDate`, milestone.updateDate);
      data.append(`request[${i}].Content`, milestone.content);
      milestone.requirementFiles.forEach((file, fileIndex) => {
        data.append(`request[${i}].RequirementFiles[${fileIndex}].Id`, file.id);
        data.append(`request[${i}].RequirementFiles[${fileIndex}].URL`, file.url);
        data.append(`request[${i}].RequirementFiles[${fileIndex}].Name`, file.name);
      });
      milestone.addedFiles.forEach((file, fileIndex) => {
        data.append(`request[${i}].AddedFiles[${fileIndex}].URL`, file);
        data.append(`request[${i}].AddedFiles[${fileIndex}].Name`, file.name);
        data.append(`request[${i}].AddedFiles[${fileIndex}].Filetype`, 0);
      });
    });
    console.log(milestoneData);

    try {
      await axios.put("https://localhost:7044/api/project-milestone-requirements", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Milestones updated successfully!");
    } catch (error) {
      console.error("Failed to update milestones:", error);
      alert("Error updating milestones.");
    }finally {
      setLoading(false);
      render();
    }
  };

  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      
      {!loading && milestones && milestones.length === 0 && <h2>No milestones found.</h2>}
      
      {!loading && milestones && milestones.length > 0 && (
        <form onSubmit={handleSubmit}>
          {milestoneData.map((milestone, index) => (
            <div key={milestone.id} style={{ marginBottom: "20px" }}>
              <Box>
              <h3>{milestones[index].reqDescription}</h3>
              </Box>
             
              <div className="w-[70%]">
              <MilestoneQuill
                value={milestone.content}
                onChange={(value) => handleQuillChange(value, index)}
              />
              </div>
              <Button variant="contained" component="label" onClick={(e) => openDropdown(e, index)}
                sx={{ backgroundColor: '#1BAA64', textTransform: 'none', fontWeight: '600' }} startIcon={<ChangeCircleIcon />}>
                Additional Files
                <input
                  type="file"
                  multiple
                  hidden
                  onChange={(e) => handleFilesSelected(Array.from(e.target.files), index)}
                />
              </Button>

              <FileUploadDropdown
                uploadedFiles={milestone.addedFiles}
                requirementFiles={milestone.requirementFiles}
                anchorEl={anchorEls[index]}
                onClose={() => closeDropdown(index)}
                onRemoveFile={(fileIndex, fileSource) => handleRemoveFile(fileIndex, index, fileSource)}
              />
            </div>
          ))}

          <Button type="submit" variant="contained" color="primary">
            Update Milestones
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdateMilestone;