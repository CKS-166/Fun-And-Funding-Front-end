import React, { useState, useEffect } from 'react'
import TaskColumn from '../../../../components/Kanban/TaskColumn';
import TaskForm from '../../../../components/Kanban/TaskForm';
import './index.css'
import { useParams, useLocation } from 'react-router-dom';
import milestoneApiInstace from '../../../../utils/ApiInstance/milestoneApiInstance';
import { checkAvailableMilestone } from "../../../../utils/Hooks/checkAvailableMilestone";
import BackdropRequestMilestone from '../../../../components/UpdateProject/BackdropRequestMilestone';
import { Typography } from '@mui/material';
import axios from "axios";
function Milestone2() {
    const { id } = useParams(); // Get the project ID from the URL
    console.log(id);
    const projectId = id;
    const location = useLocation();
    const milestoneId = location.state?.milestoneId;
    console.log(milestoneId);
    const [tasks, setTasks] = useState([]);
    const [activeCard, setActiveCard] = useState(null);
    const [milestoneData, setMilestoneData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [milestone, setMilestone] = useState(null);
    const [isBackdropHidden, setIsBackdropHidden] = useState(false);
    //get fixed milestone
    const fetchFixedMilestone = async () => {
        try {
            await milestoneApiInstace.get(`/${milestoneId}`).then(response => {
                setMilestone(response.data.result._data);
                console.log(response.data)
            });

        } catch (error) {
            console.error("Error fetching milestone:", error);
        }
    }
    //check available project milestone
    const getMilestoneData = async (id) => {
        setIsLoading(true); // Start loading when data fetch begins
        try {
            const data = await checkAvailableMilestone(projectId, id);
            setMilestoneData(data); // Set data after fetching
            console.log(data);
            setTasks(data.data[0].projectMilestoneRequirements)
            console.log(tasks)
        } catch (error) {
            console.error('Error fetching milestone data:', error);
        } finally {
            setIsLoading(false); // Stop loading once data fetch is complete
        }
    };

    // Handler to close Backdrop
    const handleBackdropClose = () => {
        setIsBackdropHidden(true);
    };
    //fetch milestoneData
    useEffect(() => {
        getMilestoneData(milestoneId);
        fetchFixedMilestone();
    }, []);

    const handleDelete = (taskIndex) => {
        const newTasks = tasks.filter((task, index) => index !== taskIndex);
        setTasks(newTasks);
    };
    console.log(activeCard);

    //generate form data
    const generateFormData = (task) => {
        const data = new FormData();
        data.append(`request[0].Id`, task.id);
        data.append(`request[0].RequirementStatus`, task.requirementStatus);
        data.append(`request[0].UpdateDate`, task.updateDate || new Date().toISOString());
        data.append(`request[0].Content`, task.content);

        // Add new files if they exist
        if (task.addedFiles) {
            task.addedFiles.forEach((fileObj, index) => {
                data.append(`request[0].AddedFiles[${index}].URL`, fileObj.file);
                data.append(`request[0].AddedFiles[${index}].Name`, fileObj.file.name);
                data.append(`request[0].AddedFiles[${index}].Filetype`, fileObj.fileType);
            });
        }

        // Add existing requirement files
        if (task.requirementFiles) {
            task.requirementFiles.forEach((file, fileIndex) => {
                data.append(`request[0].RequirementFiles[${fileIndex}].Id`, file.id);
                data.append(`request[0].RequirementFiles[${fileIndex}].URL`, file.url);
                data.append(`request[0].RequirementFiles[${fileIndex}].Name`, file.name);
                data.append(`request[0].RequirementFiles[${fileIndex}].IsDeleted`, file.IsDeleted || false);
            });
        }

        return data;
    };
    // drop card
    const handleDropCard = (newStatus, newPosition) => {
        console.log(`Drop card to ${newStatus} at position ${newPosition}`);
        if (activeCard == null) return;
        // Get a copy of the tasks array
        const updatedTasks = [...tasks];
        const draggedTask = updatedTasks[activeCard];
        console.log(draggedTask);
        // If dropping within the same status, just reorder
        if (draggedTask.requirementStatus === newStatus) {
            // Remove dragged task from its original position
            updatedTasks.splice(activeCard, 1);

            // Insert it in the new position within the same status
            updatedTasks.splice(newPosition, 0, draggedTask);
        } else {
            // If changing status, update the status and position
            draggedTask.requirementStatus = newStatus;

            // Remove from original position and insert at the new position in the target column
            updatedTasks.splice(activeCard, 1);
            updatedTasks.splice(newPosition, 0, draggedTask);
        }

        setTasks(updatedTasks);
        var data = generateFormData(draggedTask);
        handleUpdateTask(data);
        setActiveCard(null);
    };
    //handle add task
    const handleAddTask = async (data) => {
        try {
            await axios.post("https://localhost:7044/api/project-milestone-requirements", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            getMilestoneData(milestoneId); // Re-fetch the Kanban board data after adding a task
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };
    //handle update task
    const handleUpdateTask = async (data) => {
        try {
            setIsLoading(true);
            await axios.put("https://localhost:7044/api/project-milestone-requirements", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            getMilestoneData(milestoneId); // Re-fetch the Kanban board data after adding a task

        } catch (error) {
            console.error("Error adding task:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {milestoneData && milestone && milestoneData.data.length == 0
                && !isLoading && <BackdropRequestMilestone
                    isHidden={isBackdropHidden}
                    projectId={projectId}
                    milestone={milestone}
                    onCloseBackdrop={handleBackdropClose} />}
            <div className='basic-info-section'>
                <Typography
                    className='basic-info-title'
                    sx={{ width: '70%', }}
                >
                  {milestone.milestoneName} 
                </Typography>
                <Typography
                    className='basic-info-subtitle'
                    sx={{ width: '70%', }}
                >
                    {milestone.description}
                </Typography>
                <div className="app">
                    {milestone && milestone.requirements.map((req) => (
                        <>
                            <div>{req.description}  <span className='text-[#1BAA64]'>*</span></div> 
                            <TaskForm onAddTask={handleAddTask} projectId={projectId} milestoneId={milestoneId} requirementId={req.id} />
                            <main className="app_main">
                                <TaskColumn
                                    title="To do"
                                    tasks={tasks}
                                    status={0}
                                    handleDelete={handleDelete}
                                    setActiveCard={setActiveCard}
                                    onDrop={handleDropCard}
                                    updateTask={handleUpdateTask}
                                />
                                <TaskColumn
                                    title="Doing"
                                    tasks={tasks}
                                    status={1}
                                    handleDelete={handleDelete}
                                    setActiveCard={setActiveCard}
                                    onDrop={handleDropCard}
                                    updateTask={handleUpdateTask}
                                />
                                <TaskColumn
                                    title="Done"
                                    tasks={tasks}
                                    status={2}
                                    handleDelete={handleDelete}
                                    setActiveCard={setActiveCard}
                                    onDrop={handleDropCard}
                                    updateTask={handleUpdateTask}
                                />
                            </main>
                        </>
                    ))}

                </div>
            </div>

        </>

    );
}

export default Milestone2