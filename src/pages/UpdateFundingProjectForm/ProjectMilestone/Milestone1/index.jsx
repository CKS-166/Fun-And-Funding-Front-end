import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useParams, useLocation } from 'react-router-dom';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Backdrop, CircularProgress, Box, Button, Divider, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import { checkAvailableMilestone } from "../../../../utils/Hooks/checkAvailableMilestone";
import projectMilestoneApiInstace from "../../../../utils/ApiInstance/projectMilestoneApiInstance";
import UpdateMilestone from "../UpdateMilestone";
import MilestoneQuill from "../../../../components/UpdateProject/MilestoneQuill";
import FileUploadDropdown from "../../../../components/UpdateProject/UploadFiles/FileUploadDropdown";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import milestoneApiInstace from "../../../../utils/ApiInstance/milestoneApiInstance";
import BackdropRequestMilestone from "../../../../components/UpdateProject/BackdropRequestMilestone";
import Swal from "sweetalert2";
import CompleteMilestoneButton from "../../../../components/UpdateProject/CompleteMilestoneButton";
const MilestoneForm = () => {
  const { id } = useParams(); // Get the project ID from the URL
  console.log(id);
  const projectId = id;
  const location = useLocation();
  const milestoneId = location.state?.milestoneId;
  console.log(milestoneId);
  const [milestone, setMilestone] = useState(null);
  const [formDataArray, setFormDataArray] = useState([]);
  const [milestoneData, setMilestoneData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dropdownAnchorEl, setDropdownAnchorEl] = useState(null);
  const [anchorEls, setAnchorEls] = useState({})
  const [isBackdropHidden, setIsBackdropHidden] = useState(false);
  const [buttonActive, setButtonActive] = useState(false)
  //check available project milestone
  const getMilestoneData = async (id) => {
    setIsLoading(true); // Start loading when data fetch begins
    try {
      const data = await checkAvailableMilestone(projectId, id);
      setMilestoneData(data); // Set data after fetching
      console.log(data);
      if (data.status === 'create' || data.status === 'edit') {
        setIsLoading(false)
      } else {
        setIsBackdropHidden(true)
      }
    } catch (error) {
      console.error('Error fetching milestone data:', error);
    } finally {
      setIsLoading(false); // Stop loading once data fetch is complete
    }
  };
  const fetchFixedMilestone = async () => {
    try {
      const response = await milestoneApiInstace.get(
        `/${milestoneId}`
      );
      console.log(response.data);
      if (response.data.result._isSuccess) {
        const milestoneData = response.data.result._data;
        setMilestone(milestoneData);
        // Initialize formDataArray for requirements
        const initialFormData = milestoneData.requirements.map((req) => ({
          requirementId: req.id,
          content: " ", // Initial content
          requirementStatus: 0,
          updateDate: new Date(),
          milestoneId: milestoneData.id,
          fundingProjectId: projectId,
          requirementFiles: [],
        }));
        setFormDataArray(initialFormData);
      }
    } catch (error) {
      console.error("Error fetching milestone:", error);
    }
  };

  const handleBackdropClose = () => {
    setIsBackdropHidden(false);
  };

  useEffect(() => {
    fetchFixedMilestone();
    getMilestoneData(milestoneId);
  }, [milestoneId]);

  // console.log(milestoneData);
  // Handle Quill input changes for each requirement
  const handleQuillChange = (value, index) => {
    const updatedFormData = [...formDataArray];
    updatedFormData[index].content = value;
    setFormDataArray(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formDataArray);
    const data = new FormData();
    formDataArray.forEach((formData, i) => {
      data.append(`request[${i}].RequirementStatus`, formData.requirementStatus);
      data.append(`request[${i}].UpdateDate`, formData.updateDate.toISOString());
      data.append(`request[${i}].Content`, formData.content);
      data.append(`request[${i}].MilestoneId`, formData.milestoneId);
      data.append(`request[${i}].FundingProjectId`, formData.fundingProjectId);
      data.append(`request[${i}].RequirementId`, formData.requirementId);

      formData.requirementFiles.forEach((file, fileIndex) => {
        data.append(`request[${i}].RequirementFiles[${fileIndex}].URL`, file);
        data.append(`request[${i}].RequirementFiles[${fileIndex}].Name`, file.name);
        data.append(`request[${i}].RequirementFiles[${fileIndex}].Filetype`, 0);
      });
    });

    try {
      await axios.post(
        "https://localhost:7044/api/project-milestone-requirements",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Requirements submitted successfully!");
    } catch (error) {
      console.error("Error submitting requirements:", error);
      alert("Failed to submit requirements.");
    } finally {
      getMilestoneData(milestoneId);
    }
  };

  //dropdown files
  const [anchorEl, setAnchorEl] = useState(null); // Tracks dropdown state
  const [currentIndex, setCurrentIndex] = useState(null); // Tracks which requirement files are open


  const handleFilesSelected = (selectedFiles, index) => {
    const updatedFormData = [...formDataArray];
    updatedFormData[index].requirementFiles = [
      ...updatedFormData[index].requirementFiles,
      ...selectedFiles,
    ];
    setFormDataArray(updatedFormData);
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

  const handleRemoveFile = (fileIndex) => {
    const updatedFormData = [...formDataArray];
    updatedFormData[currentIndex].requirementFiles.splice(fileIndex, 1);
    setFormDataArray(updatedFormData);
  };


  if (!milestone || !milestoneData) return <p>Loading milestone...</p>;

  return (
    <div >
      {milestoneData && milestone && !isLoading
        && <BackdropRequestMilestone
          isHidden={isBackdropHidden}
          projectId={projectId}
          milestone={milestone}
          status={milestoneData.status}
          onCloseBackdrop={handleBackdropClose} />}
      {/* Backdrop with loading spinner */}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={false}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className='basic-info-section'>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight : '5rem' }}>
          <Box>
            <Typography
              className='basic-info-title'
            >
              {milestone.milestoneName}<span className='text-[#1BAA64]'>*</span>
            </Typography>
            <Typography
              className='basic-info-subtitle'
              sx={{width : '100%'}}
            >
              {milestone.description}
            </Typography>
          </Box>
          <Box>
            <CompleteMilestoneButton status={milestoneData.status} pmId={milestoneData.Id}/>
          </Box>
          
        </Box>

        {!isLoading && milestoneData && milestoneData.status == 'create' ? (
          <form onSubmit={handleSubmit}>
            {milestone.requirements.map((req, index) => (
              <div key={req.id} style={{ marginBottom: "20px" }}>
                <h3>{req.title}</h3>
                <p>{req.description}</p>
                <div className="w-[80%]">
                  <>
                    <div className="w-[70%]">
                      <MilestoneQuill
                        value={formDataArray[index]?.content || " "}
                        onChange={(value) => handleQuillChange(value, index)}
                      />
                    </div>


                    <Button variant="contained" component="label" onClick={(e) => openDropdown(e, index)}
                      sx={{ backgroundColor: '#1BAA64', textTransform: 'none', fontWeight: '600' }} startIcon={<ChangeCircleIcon />}>
                      Upload Files
                      <input
                        type="file"
                        multiple
                        hidden
                        onChange={(e) => handleFilesSelected(Array.from(e.target.files), index)}

                      />
                    </Button>
                    {formDataArray[index] && formDataArray[index].requirementFiles && (
                      <FileUploadDropdown
                        uploadedFiles={formDataArray[index].requirementFiles}
                        anchorEl={anchorEls[index]}
                        onClose={() => closeDropdown(index)}
                        onRemoveFile={(fileIndex) =>
                          handleRemoveFile(fileIndex, index)
                        }
                        requirementFiles={[]}
                      />
                    )}

                  </>
                </div>

              </div>
            ))}

            <button type="submit">Save</button>
          </form>
        ) : <UpdateMilestone render={() => getMilestoneData(milestoneId)} milestones={milestoneData?.data[0]?.projectMilestoneRequirements} />}
      </div>
    </div>
  );
};

export default MilestoneForm;