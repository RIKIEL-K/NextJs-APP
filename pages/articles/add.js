import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import 'bulma/css/bulma.min.css';
import Nav from "../../components/Nav";

export default function AddArticlePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    active: false,
    product: "",
  });

  const [products, setProducts] = useState([]); // Liste des catégories

  // Récupérer les catégories depuis l'API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/product/");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Erreur fetch:", err);
      }
    };
    fetchProducts();
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
    await fetch("http://localhost:8000/api/article/", {
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
      <h1 className="title">Ajouter un Article</h1>
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
              placeholder="Nom de l'article"
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
              placeholder="Description de l'article"
            />
          </div>
        </div>

        
        <div className="field">
          <label className="label">Prix</label>
          <div className="control">
            <input
              className="input"
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Prix"
            />
          </div>
        </div>

        
        <div className="field">
          <label className="label">Produit</label>
          <div className="control">
            <div className="select">
              <select
                name="product"
                value={form.product}
                onChange={handleChange}
              >
                <option value="">Sélectionnez un produit</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
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