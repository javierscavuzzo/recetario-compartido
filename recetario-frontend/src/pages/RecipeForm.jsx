import { useState } from 'react';
import axios from 'axios';
import './RecipeForm.css';

const RecipeForm = ({ onRecipeCreated }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'http://localhost:3000/api/recipes',
        {
          title,
          ingredients,
          instructions,
          createdBy: 'user-id', // Si tu backend lo infiere por el token, podés quitarlo
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle('');
      setIngredients('');
      setInstructions('');
      onRecipeCreated(); // refrescar recetas
    } catch (err) {
      console.error('Error al crear receta', err);
      alert('No se pudo crear la receta');
    }
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <h3>Nueva Receta</h3>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Ingredientes"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
      />
      <textarea
        placeholder="Instrucciones"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        required
      />
      <button type="submit">Crear</button>
    </form>
  );
};

export default RecipeForm;
