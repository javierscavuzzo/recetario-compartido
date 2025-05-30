import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

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

  const filtered = recipes.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      <h1>🍽️ Recetario Compartido</h1>

      <input
        type="text"
        placeholder="Buscar receta por título..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="home-recipes">
        {filtered.length === 0 ? (
          <p>No hay recetas que coincidan.</p>
        ) : (
          filtered.map((receta) => (
            <div key={receta._id} className="recipe-card">
              <h3>{receta.title}</h3>
              <p>{receta.instructions.substring(0, 100)}...</p>
              <p>
                <strong>Ingredientes:</strong> {receta.ingredients?.join(", ")}
              </p>
              <Link to={`/recetas/${receta._id}`}>
                <button className="ver-mas">Ver detalle</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
