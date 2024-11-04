import React from "react";

function TaskItem ({ task, onDelete }) {
    return (
        <React.Fragment>
            <li>
                <h3> {task.proyect} </h3>
                <p> {task.description} </p>
                <button> onClick={() => onDelete(task.id)} Eliminar </button>
            </li>
        </React.Fragment>
    );
}

export default TaskItem;