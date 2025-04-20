import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Nav from "../../../components/Nav";

export default function EditArticlePage() {
  const router = useRouter();
  const { id } = router.query;

  const [article, setArticle] = useState({
    name: "",
    description: "",
    price: "",
    active: false,
    product: null,
  });

  useEffect(() => {
    if (!id) return;
    const fetchArticle = async () => {
      const res = await fetch(`http://localhost:8000/api/article/${id}/`);
      const data = await res.json();
      setArticle(data);
    };
    fetchArticle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setArticle({
      ...article,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:8000/api/article/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    });
    router.push(`/categories/${article.product}/articles`);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
        <div>
            <Nav/>
    <div className="container">
      <h1 className="title">Modifier l’article</h1>
      <form onSubmit={handleSubmit}>
       
        <div className="field">
          <label className="label">Nom</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="name"
              value={article.name}
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
              value={article.description}
              onChange={handleChange}
              placeholder="Description de l'article"
            />
          </div>
        </div>

        
        <div className="field">
          <label className="label">Prix</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="number"
              name="price"
              value={article.price}
              onChange={handleChange}
              step="0.01"
              placeholder="Prix"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-euro-sign"></i>
            </span>
          </div>
        </div>

        
        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input
                type="checkbox"
                name="active"
                checked={article.active}
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
