import React, { useState, useCallback } from "react";
import { Button, Modal, TextField, FormControl, Select, MenuItem, Box } from "@mui/material";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { FaPlus } from "react-icons/fa";

const TaskForm = ({ onAddTask, projectId, milestoneId, requirementId }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const initialFormData = {
    content: "",
    requirementId: requirementId,
    milestoneId: milestoneId,
    fundingProjectId: projectId,
    updateDate: new Date(),
    requirementStatus: 0,
    requirementFiles: []
  }
  const [formData, setFormData] = useState(initialFormData);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  // Function to update text inputs and select dropdowns
  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const categorizeFileType = (mimeType) => {
    if (mimeType.startsWith("image/")) return 6;
    if (mimeType.startsWith("video/")) return 7;
    return 8; // Default to 2 for documents or other types
  };
  // Update files with FileType in FilePond format
  const handleFilesChange = useCallback((fileItems) => {
    setFormData((prev) => ({
      ...prev,
      requirementFiles: fileItems.map((fileItem) => ({
        file: fileItem.file,
        fileType: categorizeFileType(fileItem.file.type), // Set FileType based on MIME type
      })),
    }));
  }, []);

  //reset 
  // Reset form data to initial state
  const resetFormData = () => setFormData(initialFormData);

  // Submitting the form with FormData structure
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append(`request[0].RequirementStatus`, formData.requirementStatus);
    data.append(`request[0].UpdateDate`, formData.updateDate.toISOString());
    data.append(`request[0].Content`, formData.content);
    data.append(`request[0].MilestoneId`, formData.milestoneId);
    data.append(`request[0].FundingProjectId`, formData.fundingProjectId);
    data.append(`request[0].RequirementId`, formData.requirementId);

    // Attach files to FormData
    formData.requirementFiles.forEach((fileObj, fileIndex) => {
      data.append(`request[0].RequirementFiles[${fileIndex}].URL`, fileObj.file);
      data.append(`request[0].RequirementFiles[${fileIndex}].Name`, fileObj.file.name);
      data.append(`request[0].RequirementFiles[${fileIndex}].Filetype`, fileObj.fileType);
    });
    console.log(formData)
    try {
      await onAddTask(data);
      handleCloseModal();
      resetFormData();
    } catch (error) {
      console.error("Error adding task:", error);
    }

  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        <Button
          variant="contained" component="label"
          sx={{ backgroundColor: '#1BAA64', textTransform: 'none', fontWeight: '600' }}
          startIcon={<FaPlus />}
          onClick={handleOpenModal}
        >
          Enter Task
        </Button>
      </Box>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
          <TextField
            label="Content"
            name="content"
            fullWidth
            margin="normal"
            value={formData.content}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <Select
              label="Status"
              name="requirementStatus"
              value={formData.requirementStatus}
              onChange={handleChange}
            >
              <MenuItem value={0}>To Do</MenuItem>
              <MenuItem value={1}>Doing</MenuItem>
              <MenuItem value={2}>Done</MenuItem>
            </Select>
          </FormControl>
          <FilePond
            files={formData.requirementFiles.map(fileObj => fileObj.file)}
            onupdatefiles={handleFilesChange}
            allowMultiple
          />
          <Button type="submit">Add Task</Button>
        </form>
      </Modal>
    </>
  );
};

export default TaskForm;