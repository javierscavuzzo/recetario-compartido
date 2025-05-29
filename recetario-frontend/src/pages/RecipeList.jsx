import { useState } from 'react';
import './RecipeList.css';
import axios from 'axios';

const RecipeList = ({ recipes, fetchRecipes }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', ingredients: '', instructions: '' });

  const startEdit = (recipe) => {
    setEditingId(recipe._id);
    setEditData({
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
    });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:3000/api/recipes/${editingId}`, editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingId(null);
      fetchRecipes();
    } catch (err) {
      console.error(err);
      alert('Error al guardar cambios');
    }
  };

  return (
    <div className="recipe-list">
      {recipes.map((r) => (
        <div key={r._id} className="recipe-card">
          {editingId === r._id ? (
            <>
              <input name="title" value={editData.title} onChange={handleEditChange} />
              <textarea name="ingredients" value={editData.ingredients} onChange={handleEditChange} />
              <textarea name="instructions" value={editData.instructions} onChange={handleEditChange} />
              <button onClick={saveEdit}>Guardar</button>
              <button onClick={() => setEditingId(null)}>Cancelar</button>
            </>
          ) : (
            <>
              <h3>{r.title}</h3>
              <p><strong>Ingredientes:</strong> {r.ingredients}</p>
              <p><strong>Instrucciones:</strong> {r.instructions}</p>
              <button onClick={() => startEdit(r)}>Editar</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
