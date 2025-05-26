import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams(); // Si hay ID, es edición
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/api/recipes/${id}`)
        .then(res => {
          setTitle(res.data.title);
          setDescription(res.data.description);
        })
        .catch(err => console.error('Error al cargar receta:', err));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      if (id) {
        await axios.put(`http://localhost:3000/api/recipes/${id}`, { title, description }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Receta actualizada');
      } else {
        await axios.post('http://localhost:3000/api/recipes', { title, description }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Receta creada');
      }
      navigate('/');
    } catch (err) {
      console.error('Error al guardar receta:', err);
      alert('Error: asegúrate de estar autenticado');
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar Receta' : 'Crear Receta'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        /><br />
        <button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
      </form>
    </div>
  );
};

export default RecipeForm;
