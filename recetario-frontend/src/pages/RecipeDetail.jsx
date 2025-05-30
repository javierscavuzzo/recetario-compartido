import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./RecipeDetail.css";

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/recipes/${id}");
                setRecipe(res.data);
            } catch (err) {
                console.error("Error al cargar receta:", err);
            }
        };
        fetchRecipe();
    }, [id]);

    if (!recipe) return <p>Cargando...</p>;

    return (
        <div className="recipe-detail">
            <h2>{recipe.title}</h2>
            <p><strong>Ingredientes:</strong> {recipe.ingredients.join(", ")}</p>
            <p><strong>Instrucciones:</strong> {recipe.instructions.join}</p>
        </div>
    );
};

export default RecipeDetail;