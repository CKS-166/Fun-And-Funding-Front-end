import React, { useState, useEffect } from "react";
import { Button, Backdrop, CircularProgress, Box, Tab } from "@mui/material";
import axios from "axios";
import MilestoneQuill from "../../../../components/UpdateProject/MilestoneQuill";
import UploadButton from "../../../../components/UpdateProject/UploadFiles/UploadButton";
import FileUploadDropdown from "../../../../components/UpdateProject/UploadFiles/FileUploadDropdown";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import CompleteMilestoneButton from "../../../../components/UpdateProject/CompleteMilestoneButton";
import PackageEvidence from "../../../../components/PackageEvidence";
const UpdateMilestone = ({ milestones, render, issueLog, pmId, status, order, type, backers }) => {
  const [milestoneData, setMilestoneData] = useState([]);
  const [anchorEls, setAnchorEls] = useState({});
  const [loading, setLoading] = useState(false);
  const [issueLogData, setIssueLogData] = useState(issueLog || "");
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

  const categorizeFileType = (mimeType) => {
    if (mimeType.startsWith("image/")) return 6;
    if (mimeType.startsWith("video/")) return 7;
    return 8; // Default to 2 for documents or other types
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = new FormData();
    milestoneData.forEach((milestone, i) => {
      data.append(`request[${i}].Id`, milestone.id);
      data.append(`request[${i}].RequirementStatus`, milestone.requirementStatus);
      data.append(`request[${i}].UpdateDate`, milestone.updateDate);
      data.append(`request[${i}].Content`, milestone.content || "");
      milestone.requirementFiles.forEach((file, fileIndex) => {
        data.append(`request[${i}].RequirementFiles[${fileIndex}].Id`, file.id);
        data.append(`request[${i}].RequirementFiles[${fileIndex}].URL`, file.url);
        data.append(`request[${i}].RequirementFiles[${fileIndex}].Name`, file.name);
      });
      milestone.addedFiles.forEach((file, fileIndex) => {
        data.append(`request[${i}].AddedFiles[${fileIndex}].URL`, file);
        data.append(`request[${i}].AddedFiles[${fileIndex}].Name`, file.name);
        data.append(`request[${i}].AddedFiles[${fileIndex}].Filetype`, categorizeFileType(file.type));
      });
    });
    data.append("issueLog", issueLogData);
    data.append("type", type);
    console.log(milestoneData);

    try {
      await axios.put("https://localhost:7044/api/project-milestone-requirements", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire({
        title: `Milestone updated successfully`,
        icon: "success"
      });
    } catch (error) {
      toast.warn("Please fill in all the required fields.");
    } finally {
      setLoading(false);
      render();
    }
  };
  console.log(milestoneData)



  const handleCompleteSubmit = async () => {
    setLoading(true);
    const data = new FormData();
    milestoneData.forEach((milestone, i) => {
      data.append(`request[${i}].Id`, milestone.id);
      data.append(`request[${i}].RequirementStatus`, milestone.requirementStatus);
      data.append(`request[${i}].UpdateDate`, milestone.updateDate);
      data.append(`request[${i}].Content`, milestone.content || " ");
      milestone.requirementFiles.forEach((file, fileIndex) => {
        data.append(`request[${i}].RequirementFiles[${fileIndex}].Id`, file.id);
        data.append(`request[${i}].RequirementFiles[${fileIndex}].URL`, file.url);
        data.append(`request[${i}].RequirementFiles[${fileIndex}].Name`, file.name);
      });
      milestone.addedFiles.forEach((file, fileIndex) => {
        // console.log(categorizeFileType(file.type));
        data.append(`request[${i}].AddedFiles[${fileIndex}].URL`, file);
        data.append(`request[${i}].AddedFiles[${fileIndex}].Name`, file.name);
        data.append(`request[${i}].AddedFiles[${fileIndex}].Filetype`, categorizeFileType(file.type));
      });
    });
    data.append("issueLog", issueLogData);
    console.log(milestoneData);

    try {
      await axios.put("https://localhost:7044/api/project-milestone-requirements", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(data);
    } catch (error) {
      // toast.warn("Please fill in all the required fields.");
    } finally {
      setLoading(false);
      render();
    }
  };
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ position: 'absolute', left: '300px', top: '120px' }}>
        <CompleteMilestoneButton submit={handleCompleteSubmit} render={() => handleCompleteSubmit()} status={status} pmId={pmId} />
      </Box>
      {!loading && milestones && milestones.length === 0 && <h2>No milestones found.</h2>}

      {!loading && milestones && milestones.length > 0 && (
        <form onSubmit={handleSubmit}>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            pauseOnFocusLoss
          />
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Requirements" value="1" />
                <Tab label="Issue Logs" value="2" />
                {order == 4 && <Tab label="Reward Tracking" value="3"/>}
              </TabList>
            </Box>
            {/* milestone evidence */}
            <TabPanel value="1">
              {milestoneData.map((milestone, index) => (
                <div key={milestone.id} style={{ marginBottom: "20px" }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '70%', marginBottom: '20px' }}>
                    <h3 style={{ fontWeight: '600' }}>{milestones[index] && milestones[index].reqDescription || ""}</h3>
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
                  </Box>

                  <div className="w-[70%]">
                    <MilestoneQuill
                      value={milestone.content || " "}
                      onChange={(value) => handleQuillChange(value, index)}
                    />
                  </div>


                  <FileUploadDropdown
                    uploadedFiles={milestone.addedFiles}
                    requirementFiles={milestone.requirementFiles}
                    anchorEl={anchorEls[index]}
                    onClose={() => closeDropdown(index)}
                    onRemoveFile={(fileIndex, fileSource) => handleRemoveFile(fileIndex, index, fileSource)}
                  />
                </div>
              ))}
            </TabPanel>
            <TabPanel value="2">
              <MilestoneQuill
                value={issueLogData}
                onChange={(value) => setIssueLogData(value)}
              />
            </TabPanel>
            <TabPanel value="3">
              <>hello</>
              <PackageEvidence backers={backers}/>
            </TabPanel>
          </TabContext>
          <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: '#1BAA64', textTransform: 'none', fontWeight: '600' }}>
            Update Milestones
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdateMilestone;