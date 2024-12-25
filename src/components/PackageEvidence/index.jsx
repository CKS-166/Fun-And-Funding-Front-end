import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Tabs,
  Tab,
  Typography,
  Collapse,
  Button,
  Modal,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";

import axios from "axios";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);

const PackageEvidence = ({ backers }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [galleryModal, setGalleryModal] = useState({ open: false, image: "" });
  const [selectedBackerId, setSelectedBackerId] = useState(null);
  const [files, setFiles] = useState([]);

  const handleToggleRow = (id) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  const handleOpenModal = (id) => {
    setSelectedBackerId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFiles([]);
  };

  const handleSaveEvidence = async () => {
    if (!selectedBackerId || files.length === 0) {
      alert("Please upload at least one file.");
      return;
    }

    const formData = new FormData();
    formData.append("id", selectedBackerId);
    files.forEach((file) => {
      formData.append("files", file.file);
    });

    try {
      const response = await axios.put(
        "https://localhost:7044/api/package-backers/upload-evidence",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Evidence uploaded successfully!");
      console.log(response.data);
      handleCloseModal();
    } catch (error) {
      console.error("Error uploading evidence:", error);
      alert("Failed to upload evidence.");
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleGalleryOpen = (image) => {
    setGalleryModal({ open: true, image });
  };

  const handleGalleryClose = () => {
    setGalleryModal({ open: false, image: "" });
  };

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>User Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Package Name</strong></TableCell>
              <TableCell><strong>Donate Amount</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {backers.map((backer) => (
              <React.Fragment key={backer.id}>
                {/* Main Row */}
                <TableRow>
                  <TableCell>{backer.userName}</TableCell>
                  <TableCell>{backer.email}</TableCell>
                  <TableCell>{backer.name}</TableCell>
                  <TableCell>${backer.donateAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleToggleRow(backer.id)}>
                      <ExpandMoreIcon />
                    </IconButton>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleOpenModal(backer.id)}
                    >
                      Upload Evidence
                    </Button>
                  </TableCell>
                </TableRow>

                {/* Expanded Row */}
                <TableRow>
                  <TableCell colSpan={5}>
                    <Collapse in={expandedRow === backer.id} timeout="auto" unmountOnExit>
                      <Box sx={{ border: 1, borderRadius: 1, p: 2, mt: 1 }}>
                        <Tabs value={tabValue} onChange={handleTabChange}>
                          <Tab label="Evidence Images" />
                          <Tab label="Reward Items" />
                        </Tabs>
                        <Box mt={2}>
                          {tabValue === 0 && (
                            <Grid container spacing={2}>
                              {backer.evidenceImages.length > 0 ? (
                                backer.evidenceImages.map((image, index) => (
                                  <Grid item xs={4} key={index}>
                                    <img
                                      src={image}
                                      alt={`Evidence ${index + 1}`}
                                      style={{
                                        width: "100%",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => handleGalleryOpen(image)}
                                    />
                                  </Grid>
                                ))
                              ) : (
                                <Typography>No evidence images available.</Typography>
                              )}
                            </Grid>
                          )}
                          {tabValue === 1 && (
                            <Box>
                              {backer.rewardItems.length > 0 ? (
                                backer.rewardItems.map((item, index) => (
                                  <div key={index} style={{ marginBottom: "10px" }}>
                                    <Typography><strong>Name:</strong> {item.name}</Typography>
                                    <Typography><strong>Description:</strong> {item.description}</Typography>
                                    <Typography><strong>Quantity:</strong> {item.quantity}</Typography>
                                    <img
                                      src={item.imageUrl}
                                      alt={item.name}
                                      style={{ width: "100px", borderRadius: "5px", marginTop: "5px" }}
                                    />
                                  </div>
                                ))
                              ) : (
                                <Typography>No reward items available.</Typography>
                              )}
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Upload Evidence */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="upload-evidence-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: 400,
            borderRadius: 2,
          }}
        >
          <Typography id="upload-evidence-modal" variant="h6" component="h2" mb={2}>
            Upload Evidence
          </Typography>
          <FilePond
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={true}
            maxFiles={5}
            name="files"
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSaveEvidence}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal for Gallery View */}
      <Modal
        open={galleryModal.open}
        onClose={handleGalleryClose}
        aria-labelledby="gallery-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <img
            src={galleryModal.image}
            alt="Evidence"
            style={{ width: "100%", borderRadius: "5px" }}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default PackageEvidence;