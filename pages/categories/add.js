import { useState } from "react";
import { useRouter } from "next/router";
import 'bulma/css/bulma.min.css';
import Nav from "../../components/Nav";

export default function AddCategoryPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", description: "", active: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8000/api/category/", {
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
      <h1 className="title">Ajouter une Catégorie</h1>
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
              placeholder="Nom de la catégorie"
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
              placeholder="Description de la catégorie"
            />
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