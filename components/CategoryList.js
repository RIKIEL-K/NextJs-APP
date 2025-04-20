import { useState, useEffect } from 'react';
import { getCategories,deleteCategory } from '../utils/api';
import Category from './Category';

export default function CategoryList() {

    const [categories, setCategories] = useState([]);

    useEffect(()=> {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }
    , []);

    const handleDelete = async (id) => {
        try {
            await deleteCategory(id);
            setCategories(categories.filter(category => category.id !== id));
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };
    return(

        <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",  // Centre les cartes horizontalement
      alignItems: "center",      // Centre les cartes verticalement
      gap: "1rem",
      height: "100vh",           // Assure-toi que la page occupe toute la hauteur de l'écran
      padding: "1rem",           // Ajoute un peu de marge autour des cartes
    }}
  >
    {categories.map((category) => (
      <Category key={category.id} product={category} onDelete={handleDelete} />
    ))}
  </div>


    )


}