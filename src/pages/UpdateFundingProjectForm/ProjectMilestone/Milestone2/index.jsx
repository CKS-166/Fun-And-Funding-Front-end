import React, { useState, useEffect } from 'react'
import TaskColumn from '../../../../components/Kanban/TaskColumn';
import TaskForm from '../../../../components/Kanban/TaskForm';
import './index.css'
import { useParams, useLocation } from 'react-router-dom';
import milestoneApiInstace from '../../../../utils/ApiInstance/milestoneApiInstance';
const oldTasks = localStorage.getItem("tasks");

function Milestone2() {
    const { id } = useParams(); // Get the project ID from the URL
    console.log(id);
    const projectId = id;
    const location = useLocation();
    const milestoneId = location.state?.milestoneId;
    console.log(milestoneId);
    const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);
    const [activeCard, setActiveCard] = useState(null);
    //fetch milestoneData
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const handleDelete = (taskIndex) => {
        const newTasks = tasks.filter((task, index) => index !== taskIndex);
        setTasks(newTasks);
    };
    console.log(activeCard);

    const handleDropCard = (status, position) => {
        console.log(`${activeCard} is dropped to ${status} at ${position}`);
        if (activeCard == null || activeCard == undefined) return;

        const chosenTask = tasks[activeCard];

        const updatedTask = tasks.filter((task, index) => index !== activeCard);
        updatedTask.splice(position, 0, {
            ...chosenTask,
            status: status
        });

        setTasks(updatedTask);
        console.log(updatedTask);
    }
    return (
        <div className="app">
            <TaskForm setTasks={setTasks} />
            <main className="app_main">
                <TaskColumn
                    title="To do"

                    tasks={tasks}
                    status="todo"
                    handleDelete={handleDelete}
                    setActiveCard={setActiveCard}
                    onDrop={handleDropCard}
                />
                <TaskColumn
                    title="Doing"

                    tasks={tasks}
                    status="doing"
                    handleDelete={handleDelete}
                    setActiveCard={setActiveCard}
                    onDrop={handleDropCard}
                />
                <TaskColumn
                    title="Done"

                    tasks={tasks}
                    status="done"
                    handleDelete={handleDelete}
                    setActiveCard={setActiveCard}
                    onDrop={handleDropCard}
                />
            </main>
        </div>
    );
}

export default Milestone2