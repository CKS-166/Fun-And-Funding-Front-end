import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Button, Divider, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import { checkAvailableMilestone } from "../../../../utils/Hooks/checkAvailableMilestone";
import projectMilestoneApiInstace from "../../../../utils/ApiInstance/projectMilestoneApiInstance";
import UpdateMilestone from "../UpdateMilestone";
import MilestoneQuill from "../../../../components/UpdateProject/MilestoneQuill";
const MilestoneForm = () => {
  const { id } = useParams(); // Get the project ID from the URL
  console.log(id);
  const [milestone, setMilestone] = useState(null);
  const [formDataArray, setFormDataArray] = useState([]);
  const [milestoneData, setMilestoneData] = useState(null);
  const sampleProjectId = "4127aeab-4133-4699-e201-08dcf350af22"; // Replace with real project ID

  //check available project milestone
  const getMilestoneData = async (id) => {
    try {
      const data = await checkAvailableMilestone(sampleProjectId, id);
      setMilestoneData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching milestone data:", error);
    }
  };
  const fetchFixedMilestone = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7044/api/milestone/group-latest-milestone"
      );
      if (response.data._isSuccess) {
        const milestoneData = response.data._data[0];
        setMilestone(milestoneData);
        // Initialize formDataArray for requirements
        const initialFormData = milestoneData.requirements.map((req) => ({
          requirementId: req.id,
          content: "", // Initial content
          requirementStatus: 0,
          updateDate: new Date(),
          milestoneId: milestoneData.id,
          fundingProjectId: sampleProjectId,
          requirementFiles: [],
        }));
        setFormDataArray(initialFormData);
      }
    } catch (error) {
      console.error("Error fetching milestone:", error);
    }
  };

  useEffect(() => {
    fetchFixedMilestone();
    getMilestoneData(id);
  }, []);

  // Handle Quill input changes for each requirement
  const handleQuillChange = (value, index) => {
    const updatedFormData = [...formDataArray];
    updatedFormData[index].content = value;
    setFormDataArray(updatedFormData);
  };
  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('file', file);

      const res = await axios.post(
        "https://localhost:7044/api/storage",
        formData
      );
      const imageUrl = res.data;
      const quill = reactQuillRef.current;
      if (quill) {
        const range = quill.getEditorSelection();
        range && quill.getEditor().insertEmbed(range.index, "image", imageUrl);
      }

      console.log(res)
    };
  }, []);
  const modules = {
    toolbar: {
      container: [
        [{ 'header': [3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
        [{ color: [] }, { background: [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    },
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  };
  const reactQuillRef = useRef(null);


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

    // try {
    //   await axios.post(
    //     "https://localhost:7044/api/project-milestone-requirements",
    //     data,
    //     { headers: { "Content-Type": "multipart/form-data" } }
    //   );
    //   alert("Requirements submitted successfully!");
    // } catch (error) {
    //   console.error("Error submitting requirements:", error);
    //   alert("Failed to submit requirements.");
    // }
  };

  if (!milestone) return <p>Loading milestone...</p>;

  return (
    <div>
      <div className='basic-info-section'>
        <Typography
          className='basic-info-title'
          sx={{ width: '70%', }}
        >
          {milestone.milestoneName}<span className='text-[#1BAA64]'>*</span>
        </Typography>
        <Typography
          className='basic-info-subtitle'
          sx={{ width: '70%', }}
        >
          {milestone.description}
        </Typography>
        <form onSubmit={handleSubmit}>
          {milestone.requirements.map((req, index) => (
            <div key={req.id} style={{ marginBottom: "20px" }}>
              <h3>{req.title}</h3>
              <p>{req.description}</p>
              <div className="w-[80%]">
                {milestoneData && milestoneData.status !== 'create' ? (
                  <>
                  <MilestoneQuill
                  value={formDataArray[index]?.content || ""}
                  onChange={(value) => handleQuillChange(value, index)}
                />

                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    const selectedFiles = Array.from(e.target.files);
                    const updatedFormData = [...formDataArray];
                    updatedFormData[index].requirementFiles = selectedFiles;
                    setFormDataArray(updatedFormData);
                  }}
                />
                  </>
                ) : <UpdateMilestone milestones={milestoneData &&milestoneData.data[0].projectMilestoneRequirements}/>}
                
              </div>

            </div>
          ))}

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default MilestoneForm;