import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import 'bulma/css/bulma.min.css';
import Nav from "../../components/Nav";

export default function AddProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    active: false,
    category: "",
  });

  const [categories, setCategories] = useState([]); // Liste des catégories

  // Récupérer les catégories depuis l'API
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("http://localhost:8000/api/category/");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8000/api/product/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/");
  };

  return (
    <div>
   <Nav/>
<div className="container">
      <h1 className="title">Ajouter un Produit</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Nom</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nom de du produit"
            />
          </div>
        </div>

       
        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea
              className="textarea"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description du produit"
            />
          </div>
        </div>

        
        <div className="field">
          <label className="label">Catégorie</label>
          <div className="control">
            <div className="select">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Sélectionnez une catégorie</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        
        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input
                type="checkbox"
                name="active"
                checked={form.active}
                onChange={handleChange}
              />
              &nbsp;Actif
            </label>
          </div>
        </div>

        
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">
              Enregistrer
            </button>
          </div>
          <div className="control">
            <button
              className="button is-link is-light"
              type="button"
              onClick={() => router.push("/")}
            >
              Annuler
            </button>
          </div>
        </div>
      </form>
    </div>

    </div>
    
    
  );
}