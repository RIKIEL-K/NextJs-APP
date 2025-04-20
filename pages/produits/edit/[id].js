import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Nav from "../../../components/Nav";

export default function EditArticlePage() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState({
    name: "",
    description: "",
    active: false,
    product: null,
  });

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:8000/api/product/${id}/`);
      const data = await res.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:8000/api/product/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    router.push(`/produits/${product.category}/products`);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
        <div>
            <Nav/>
    <div className="container">
      <h1 className="title">Modifier le produit</h1>
      <form onSubmit={handleSubmit}>
       
        <div className="field">
          <label className="label">Nom</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="name"
              value={product.name}
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
              value={product.description}
              onChange={handleChange}
              placeholder="Description de l'article"
            />
          </div>
        </div>


        
        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input
                type="checkbox"
                name="active"
                checked={product.active}
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
              onClick={handleCancel}
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
