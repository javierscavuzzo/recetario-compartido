import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

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

  return (
    <div>
      <h2>Recetas</h2>
      <button onClick={() => navigate('/recipes/create')}>Crear Receta</button>
      <ul>
        {recipes.map((r) => (
          <li key={r._id}>
            <strong>{r.title}</strong> - {r.description}
            <button onClick={() => navigate(`/recipes/edit/${r._id}`)}>Editar</button>
            <button onClick={() => handleDelete(r._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
