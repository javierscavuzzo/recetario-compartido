import { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);


  const fetchRecipes = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/recipes');
      setRecipes(res.data);
    } catch (err) {
      console.error('Error al cargar recetas:', err);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/api/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchRecipes(); // Refrescar la lista
    } catch (err) {
      console.error('Error al eliminar receta:', err);
      alert('No autorizado o error al eliminar');
    }
  };

  {recipes.map((receta) => (
  <div key={receta._id} className="recipe-card">
    <h3>{receta.titulo}</h3>
    <p>{receta.descripcion}</p>
    <button onClick={() => handleDelete(receta._id)}>Eliminar</button>
  </div>
))}

  return (
    <div className="dashboard-container">
  <div className="dashboard-header">
    <h2>Mis Recetas</h2>
    <button>Crear receta</button>
  </div>
  <div className="recipe-list">
    <div className="recipe-card">
      <h3>Nombre de receta</h3>
      <p>Descripción</p>
      <button className="edit-btn">Editar</button>
      <button className="delete-btn">Eliminar</button>
    </div>
  </div>
</div>
  );
};

export default Dashboard;
