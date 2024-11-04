import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import AddProjectForm from './Formulario';
import ProjectList from './TaskList';

function App() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projectsArray = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProjects(projectsArray);
    };

    fetchProjects();
  }, []);

  const addProject = async (project) => {
    const docRef = await addDoc(collection(db, 'projects'), project);
    setProjects([...projects, { id: docRef.id, ...project }]);
    setShowForm(false);
  };

  const deleteProject = async (id) => {
    await deleteDoc(doc(db, 'projects', id));
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <div className="App">
      <h1>Gestión de Proyectos</h1>

      {projects.length === 0 ? (
        <p>No hay proyectos</p>
      ) : (
        <ProjectList projects={projects} onDelete={deleteProject} />
      )}

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancelar' : 'Agregar Proyecto'}
      </button>

      {showForm && <AddProjectForm onSave={addProject} />}
    </div>
  );
}

export default App;