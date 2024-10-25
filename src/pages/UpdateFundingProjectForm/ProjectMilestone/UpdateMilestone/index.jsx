import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@mui/material";
import axios from "axios";

const UpdateMilestone = ({ milestones }) => {
    console.log(milestones)
  const [milestoneData, setMilestoneData] = useState(
    milestones.map((milestone) => ({
      id: milestone.id,
      updateDate: new Date().toISOString(),
      content: milestone.content || "",
      requirementStatus: milestone.requirementStatus || 0,
      requirementFiles: milestone.requirementFiles || [],
      addedFiles: [],
    }))
  );

  // Array of refs for each Quill editor
  const quillRefs = useRef([]);

  // Ensure refs are properly initialized for each milestone
  useEffect(() => {
    quillRefs.current = quillRefs.current.slice(0, milestoneData.length);
  }, [milestoneData]);

  // Handle Quill content change
  const handleQuillChange = (value, index) => {
    const updatedMilestones = [...milestoneData];
    updatedMilestones[index].content = value;
    setMilestoneData(updatedMilestones);
  };

  // Custom image handler with ref handling
  const imageHandler = useCallback((index) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await axios.post(
          "https://localhost:7044/api/storage",
          formData
        );
        const imageUrl = res.data;

        const quill = quillRefs.current[index]?.getEditor();
        if (quill) {
          quill.focus();
          const range = quill.getSelection(true);

          if (range) {
            quill.insertEmbed(range.index, "image", imageUrl);
            quill.setSelection(range.index + 1);
          }
        }
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    };
  }, []);

  // Configure Quill modules with handlers
  const getQuillModules = (index) => ({
    toolbar: {
      container: [
        [{ header: [3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote", "code"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: () => imageHandler(index),
      },
    },
    clipboard: {
      matchVisual: false,
    },
  });

  const handleFileChange = (index, e) => {
    const files = Array.from(e.target.files);
    const updatedMilestones = [...milestoneData];
    updatedMilestones[index].addedFiles.push(...files);
    setMilestoneData(updatedMilestones);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payloadArray = milestoneData.map((milestone) => {
      const formData = new FormData();
      formData.append("id", milestone.id);
      formData.append("updateDate", milestone.updateDate);
      formData.append("content", milestone.content);
      formData.append("requirementStatus", milestone.requirementStatus);

      milestone.requirementFiles.forEach((file) =>
        formData.append("requirementFiles", JSON.stringify(file))
      );

      milestone.addedFiles.forEach((file) => formData.append("addedFiles", file));
      return formData;
    });

    try {
      await axios.post(
        "https://localhost:7044/api/project-milestone-requirements/update",
        payloadArray,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Milestones updated successfully!");
    } catch (error) {
      console.error("Failed to update milestones:", error);
      alert("Error updating milestones.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {milestoneData.map((milestone, index) => (
        <div key={milestone.id} style={{ marginBottom: "20px" }}>
          <h3>{milestones[index].description}</h3>

          <ReactQuill
            value={milestone.content}
            onChange={(value) => handleQuillChange(value, index)}
            theme="snow"
            ref={(el) => (quillRefs.current[index] = el)}
            modules={getQuillModules(index)}
          />

          <input
            type="file"
            multiple
            onChange={(e) => handleFileChange(index, e)}
          />
        </div>
      ))}

      <Button type="submit" variant="contained" color="primary">
        Update Milestones
      </Button>
    </form>
  );
};

export default UpdateMilestone;