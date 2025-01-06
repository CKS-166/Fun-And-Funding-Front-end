import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
    Backdrop,
    Box, Button,
    CircularProgress,
    Tab,
    Typography
} from '@mui/material';
import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useLocation, useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import PackageEvidence from '../../../../components/PackageEvidence';
import Timer from "../../../../components/Timer";
import BackdropRequestMilestone from "../../../../components/UpdateProject/BackdropRequestMilestone";
import MilestoneQuill from "../../../../components/UpdateProject/MilestoneQuill";
import FileUploadDropdown from "../../../../components/UpdateProject/UploadFiles/FileUploadDropdown";
import milestoneApiInstace from "../../../../utils/ApiInstance/milestoneApiInstance";
import packageBackerApiInstance from '../../../../utils/ApiInstance/packageBackerApiInstance';
import { checkAvailableMilestone } from "../../../../utils/Hooks/checkAvailableMilestone";
import UpdateMilestone from "../UpdateMilestone";

const Milestone4 = () => {
    const { id } = useParams();
    const projectId = id;
    const location = useLocation();
    const milestoneId = location.state?.milestoneId;
    const [milestone, setMilestone] = useState(null);
    const [formDataArray, setFormDataArray] = useState([]);
    const [milestoneData, setMilestoneData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [dropdownAnchorEl, setDropdownAnchorEl] = useState(null);
    const [anchorEls, setAnchorEls] = useState({})
    const [isBackdropHidden, setIsBackdropHidden] = useState(false);
    const [buttonActive, setButtonActive] = useState(false)
    const [issueLog, setIssueLog] = useState("");
    const [daysLeft, setDaysLeft] = useState(0);
    const [packageBackers, setPackBackers] = useState([]);

    //check available project milestone
    const getMilestoneData = async (id) => {
        setIsLoading(true); // Start loading when data fetch begins
        try {
            const data = await checkAvailableMilestone(projectId, id);
            setMilestoneData(data); // Set data after fetching
            console.log(data);
            const start = data.data[0] && new Date(data.data[0].createdDate);
            const end = data.data[0] && new Date(data.data[0].endDate);
            const timeDiff = end - start;
            const dayDiff = Math.round(timeDiff / (1000 * 60 * 60 * 24));
            setDaysLeft(dayDiff);
            if (data.status === 'create' || data.status === 'edit' || data.status === 'warning') {
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
                `/${milestoneId}?filter=1`
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

    const fetchPackageBackers = async (id) => {
        setIsLoading(true);
        await packageBackerApiInstance.get(`/project-backers-detail?projectId=${id}`).then((res) => {
            if (res.data._isSuccess) {
                setPackBackers(res.data._data);
                setIsLoading(false);
            }
        })
    }

    const handleBackdropClose = () => {
        setIsBackdropHidden(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                await fetchFixedMilestone(); // Fetch fixed milestone data first
                await getMilestoneData(milestoneId); // Then fetch milestone data
                await fetchPackageBackers(projectId);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [milestoneId]);

    const handleQuillChange = (value, index) => {
        const updatedFormData = [...formDataArray];
        updatedFormData[index].content = value;
        setFormDataArray(updatedFormData);
    };

    const categorizeFileType = (mimeType) => {
        if (mimeType.startsWith("image/")) return 6;
        if (mimeType.startsWith("video/")) return 7;
        return 8; // Default to 2 for documents or other types
    };
    //form submitted
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formDataArray);
        const data = new FormData();
        formDataArray.forEach((formData, i) => {
            data.append(`request[${i}].RequirementStatus`, formData.requirementStatus);
            data.append(`request[${i}].UpdateDate`, formData.updateDate.toISOString());
            data.append(`request[${i}].Content`, formData.content || " ");
            data.append(`request[${i}].MilestoneId`, formData.milestoneId);
            data.append(`request[${i}].FundingProjectId`, formData.fundingProjectId);
            data.append(`request[${i}].RequirementId`, formData.requirementId);

            formData.requirementFiles.forEach((file, fileIndex) => {
                data.append(`request[${i}].RequirementFiles[${fileIndex}].URL`, file);
                data.append(`request[${i}].RequirementFiles[${fileIndex}].Name`, file.name);
                data.append(`request[${i}].RequirementFiles[${fileIndex}].Filetype`, categorizeFileType(file.type));
            });
        });
        data.append("issueLog", issueLog);
        try {
            await axios.post(
                "https://localhost:7044/api/project-milestone-requirements",
                data,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            Swal.fire({
                title: "You have been successfully updated evidence for this milestone",
                text: "Milestone created successfully",
                icon: "success"
            });
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Failed to submit requirements",
                icon: "error"
            });
        } finally {
            getMilestoneData(milestoneId);
        }
    };

    //resubmit when complete

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

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div>
            {(isLoading && !milestone || !milestoneData) ? (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={true} // Force the Backdrop to open
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : <>
                {milestoneData && milestone && !isLoading && milestone.milestoneType == 1
                    && <BackdropRequestMilestone
                        isHidden={isBackdropHidden}
                        projectId={projectId}
                        milestone={milestone}
                        status={milestoneData.status}
                        onCloseBackdrop={handleBackdropClose}
                        render={() => getMilestoneData(milestoneId)} />}

                <div className='basic-info-section'>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '5rem' }}>
                        <Box>
                            <Typography
                                className='basic-info-title'

                            >
                                <h3 style={{ fontWeight: '700' }}>{milestone.milestoneName} <span className='text-[#1BAA64]'>*</span></h3>
                            </Typography>
                            <Typography
                                className='basic-info-subtitle'
                                sx={{ width: '100%' }}
                            >
                                <h3 style={{ fontWeight: '600' }}>{milestone.description}</h3>
                            </Typography>
                        </Box>
                        <Box>
                            <Timer days={daysLeft} />
                        </Box>
                    </Box>

                    {!isLoading && (milestoneData && milestoneData.status == 'create')
                        ? (
                            <form onSubmit={handleSubmit}>
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                                            <Tab label="Requirements" value="1" />
                                            <Tab label="Issue Logs" value="2" />
                                            {milestone.milestoneOrder == 4 && <Tab label="Reward Tracking" value="3" />}
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1">
                                        {milestone.requirements.map((req, index) => (
                                            <div key={req.id} style={{ marginBottom: "20px" }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '70%', marginBottom: '20px' }}>
                                                    <h3 style={{ fontWeight: '600', width: '600px' }}>{req.description}</h3>
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
                                                </Box>
                                                <div className="w-[80%]">
                                                    <>
                                                        <div className="w-[70%]">
                                                            <MilestoneQuill
                                                                value={formDataArray[index]?.content || " "}
                                                                onChange={(value) => handleQuillChange(value, index)}
                                                            />
                                                        </div>
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
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <MilestoneQuill
                                            value={issueLog || ""}
                                            onChange={(value) => setIssueLog(value)}
                                        />
                                    </TabPanel>
                                    <TabPanel value="3">
                                        <PackageEvidence backers={packageBackers} />
                                    </TabPanel>
                                </TabContext>


                                <Button ype="submit" variant="contained" color="primary" sx={{
                                    backgroundColor: '#1BAA64'
                                    , textTransform: 'none', fontWeight: '600', width: '100px'
                                }} type="submit">
                                    Save
                                </Button >
                            </form>
                        ) : <UpdateMilestone render={() => getMilestoneData(milestoneId)}
                            backers={packageBackers}
                            type={milestone.milestoneType}
                            milestones={milestoneData?.data[0]?.projectMilestoneRequirements}
                            issueLog={milestoneData?.data[0]?.issueLog} pmId={milestoneData?.data[0]?.id}
                            status={milestoneData?.status} order={milestone.milestoneOrder} />}
                </div>
            </>}

        </div>
    );
};

export default Milestone4;