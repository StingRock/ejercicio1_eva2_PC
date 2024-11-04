import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import { db } from './firebase';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const snapshot = await db.collection('tasks').get();
            const tasksData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setTasks(tasksData);
        };
        fetchTasks();
    }, []);

    const handleDelete = async (taskId) => {
        try {
            await db.collection('tasks').doc(taskId).delete();
            setTasks(tasks.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error('Error al eliminar proyecto:', error);
        }
    };

    return (
        <ul>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onDelete={handleDelete} />
            ))}
        </ul>
    );
}

export default TaskList;
