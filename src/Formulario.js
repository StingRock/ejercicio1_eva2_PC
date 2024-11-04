import React, { useState } from "react";
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

function ProyectForm({ addProyect }) {
    const [form, setForm] = useState({ proyect: '', description: '' });
    const [validator] = useState(new SimpleReactValidator());

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
            const additionalData = response.data;
            
            const newTask = { ...form, additionalData: { title: additionalData.title, completed: additionalData.completed 
                } 
            };

            const docRef = await addDoc(collection(db, 'task'),newTask);
            addProyect({ id:docRef.id, ...newTask });
            setForm({ proyect: '', description: '' });

        } catch (error) {
            console.error('Error al agregar proyecto:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    name="proyect"
                    value={form.proyect}
                    onChange={handleChange}
                    placeholder="Proyecto"
                />
                {validator.message('proyect', form.proyect, 'required')}
            </div>

            <div>
                <input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Descripción"
                />
                {validator.message('description', form.description, 'required|min:10')}
            </div>
            
            <button type="submit">Agregar Proyecto</button>
        </form>
    );
}

function ProyectList({ proyects }) {
    return (
        <div>
            {proyects.length > 0 ? (
                <ul>
                    {proyects.map((proyect, index) => (
                        <React.Fragment key={index}>
                            <h3>{proyect.proyect}</h3>
                            <p>{proyect.description}</p>
                            {proyect.additionalData && (
                                <div>
                                    <p><strong>Datos Adicionales:</strong></p>
                                    <p>Título: {proyect.additionalData.title}</p>
                                    <p>Completado: {proyect.additionalData.completed ? "Sí" : "No"}</p>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </ul>
            ) : (
                <p>No hay proyectos</p>
            )}
        </div>
    );
}

function ProyectManagementApp() {
    const [proyects, setProyects] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const addProyect = (proyect) => {
        setProyects([...proyects, proyect]);
    };

    return (
        <div>
            <button onClick={() => setShowForm(true)}>
                Agregar Proyectos
            </button>
            {showForm && <ProyectForm addProyect={addProyect} />}
            <ProyectList proyects={proyects} />
        </div>
    );
}

//export default ProyectForm;
export default ProyectManagementApp;

