import { useEffect, useState } from "react";
import { useRouter } from "next/router";
 import Nav from "../../../components/Nav";
import Product from "../../../components/Product";

export default function ProductsPage(){
    const router = useRouter();
    const { id } = router.query; 
    const [Products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id || isNaN(parseInt(id))) return;
    
        const fetchProducts = async () => {
          try {
            const res = await fetch("http://localhost:8000/api/product/");
            const allProducts = await res.json();
    
            const filtered = allProducts.filter(
              (product) => product.category === parseInt(id)
            );
    
            setProducts(filtered);
            setLoading(false);
          } catch (err) {
            console.error("Erreur de chargement des Products :", err);
          }
        };
    
        fetchProducts();
      }, [id]);
  

  
    const onDelete = async (productId) => {
      await fetch(`http://localhost:8000/api/product/${productId}/`, {
        method: "DELETE",
      });
      setProducts(Products.filter((product) => product.id !== productId));
    };
  
    const onEdit = (productId) => {
      router.push(`/produits/edit/${productId}/`);
    };

    const onSee = (productId) => {
      router.push(`/categories/${productId}/articles`);
    };
  
    if (loading) return <p>Chargement...</p>;

    return (
      <div>
        <Nav/>
        <section className="section">
        <div className="container">
          {Products.length === 0 ? (
            <div className="notification is-warning">
              Cette catégorie ne contient aucun produit.
            </div>
          ) : (
            <div className="columns is-multiline">
              {Products.map((product) => (
                <div key={product.id} className="column is-one-quarter">
                  <Product
                    product={product}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onSee={onSee}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      </div>

    );


}