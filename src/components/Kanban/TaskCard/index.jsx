import React from "react";
import "./index.css";
const TaskCard = ({ title, tags, handleDelete, index, setActiveCard }) => {
    return (
        <article className='task_card' draggable onDragStart={() => setActiveCard(index)} onDragEnd={() => setActiveCard(null)}> 
            <p className='task_text'>{title}</p>

            <div className='task_card_bottom_line'>
                <div
                    className='task_delete'
                    onClick={() => handleDelete(index)}>
                </div>
            </div>
        </article>
    );
};

export default TaskCard;
