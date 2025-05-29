import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editInstructions, setEditInstructions] = useState("");
  const [editIngredients, setEditIngredients] = useState("");

  const fetchRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/recipes");
      setRecipes(res.data);
    } catch (err) {
      console.error("Error al cargar recetas:", err);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:3000/api/recipes",
        {
          title,
          instructions,
          ingredients: ingredients.split(",").map((i) => i.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle("");
      setInstructions("");
      setIngredients("");
      fetchRecipes();
    } catch (err) {
      console.error("Error al crear receta:", err);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:3000/api/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchRecipes();
    } catch (err) {
      console.error("Error al eliminar receta:", err);
      alert("No autorizado o error al eliminar");
    }
  };

  const handleEdit = async (e, id) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:3000/api/recipes/${id}`,
        {
          title: editTitle,
          instructions: editInstructions,
          ingredients: editIngredients.split(",").map((i) => i.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditingId(null);
      fetchRecipes();
    } catch (err) {
      console.error("Error al editar receta:", err);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>📘 Panel de Recetas</h2>

      {/* Crear receta */}
      <form className="recipe-form" onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Instrucciones"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Ingredientes (separados por coma)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />
        <button type="submit">Crear receta</button>
      </form>

      {/* Lista de recetas */}
      <div className="recipe-list">
        {recipes.length === 0 ? (
          <p>No hay recetas aún.</p>
        ) : (
          recipes.map((receta) => (
            <div key={receta._id} className="recipe-card">
              {editingId === receta._id ? (
                <form onSubmit={(e) => handleEdit(e, receta._id)}>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <textarea
                    value={editInstructions}
                    onChange={(e) => setEditInstructions(e.target.value)}
                  ></textarea>
                  <input
                    value={editIngredients}
                    onChange={(e) => setEditIngredients(e.target.value)}
                  />
                  <button type="submit">Guardar</button>
                  <button type="button" onClick={() => setEditingId(null)}>
                    Cancelar
                  </button>
                </form>
              ) : (
                <>
                  <h3>{receta.title}</h3>
                  <p>{receta.instructions}</p>
                  <ul>
                    {receta.ingredients?.map((ing, i) => (
                      <li key={i}>🍴 {ing}</li>
                    ))}
                  </ul>
                  {receta.createdBy && (
                    <p className="creator">👤 Por: {receta.createdBy.name}</p>
                  )}
                  <button
                    onClick={() => {
                      setEditingId(receta._id);
                      setEditTitle(receta.title);
                      setEditInstructions(receta.instructions);
                      setEditIngredients(receta.ingredients.join(", "));
                    }}
                  >
                    Editar
                  </button>
                  <button onClick={() => handleDelete(receta._id)}>
                    Eliminar
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
