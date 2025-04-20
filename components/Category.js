"use client";
import { useRouter } from "next/navigation";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Category({ product,onDelete }) {
  const router = useRouter();

  const handleSeeProducts = () => {
      router.push(`/produits/${product.id}/products`);
  };
  return (
    <div
    className="card"
    style={{
      width: "200px",     
      height: "300px",       
      border: "1px solid #ddd",
      padding: "1rem",      
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",  
    }}
  >
    <div className="card-content">
      <div className="media">
        <div className="media-content">
          <p className="title is-4">{product.name}</p>
          <p className="subtitle is-6">{product.description}</p>
        </div>
      </div>
    </div>

    <div className="card-footer" style={{ display: "flex", justifyContent: "space-between" }}>
      
      <button
        className="button is-primary"
        onClick={handleSeeProducts}
        style={{
          width: "48%", 
        }}
      >
        <i className="bi bi-eye-fill"></i>
      </button>

      <button
        className="button is-danger"
        onClick={() => onDelete(product.id)}
        style={{
          width: "48%", 
        }}
      >
        <i className="bi bi-trash3-fill"></i>
      </button>
    </div>
  </div>
  );
}