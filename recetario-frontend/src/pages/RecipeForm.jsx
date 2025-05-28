import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './RecipeForm.css';

const RecipeForm = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // Si hay ID, estamos editando

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/api/recipes/${id}`)
        .then((res) => {
          setTitulo(res.data.titulo);
          setDescripcion(res.data.descripcion);
        })
        .catch((err) => {
          console.error('Error al obtener la receta:', err);
          alert('No se pudo cargar la receta');
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const receta = { titulo, descripcion };

    try {
      if (id) {
        await axios.put(`http://localhost:3000/api/recipes/${id}`, receta);
        alert('Receta actualizada correctamente');
      } else {
        await axios.post('http://localhost:3000/api/recipes', receta, {
          headers: {
            Authorization: 'Bearer TU_TOKEN_AQUI' // Si usás auth, remplaza por token válido
          }
        });
        alert('Receta creada correctamente');
      }
      navigate('/dashboard');
    } catch (err) {
      console.error('Error al guardar la receta:', err);
      alert('Hubo un error al guardar la receta');
    }
  };

  return (
    <div className="recipe-form-container">
      <h2>{id ? 'Editar Receta' : 'Crear Receta'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          rows="5"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        ></textarea>
        <button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
      </form>
    </div>
  );
};

export default RecipeForm;
