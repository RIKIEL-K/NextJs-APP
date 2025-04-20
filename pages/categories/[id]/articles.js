import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Article from "../../../components/Article"; 
import Nav from "../../../components/Nav";

export default function ArticlesPage(){
    const router = useRouter();
    const { id } = router.query; 
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id || isNaN(parseInt(id))) return;
    
        const fetchArticles = async () => {
          try {
            const res = await fetch("http://localhost:8000/api/article/");
            const allArticles = await res.json();
    
            const filtered = allArticles.filter(
              (article) => article.product === parseInt(id)
            );
    
            setArticles(filtered);
            setLoading(false);
          } catch (err) {
            console.error("Erreur de chargement des articles :", err);
          }
        };
    
        fetchArticles();
      }, [id]);
  

  
    const onDelete = async (articleId) => {
      await fetch(`http://localhost:8000/api/article/${articleId}/`, {
        method: "DELETE",
      });
      setArticles(articles.filter((article) => article.id !== articleId));
    };
  
    const onEdit = (articleId) => {
      router.push(`/articles/edit/${articleId}/`);
    };
  
    if (loading) return <p>Chargement...</p>;

    return (
      <div>
        <Nav/>
        <section className="section">
        <div className="container">
          {articles.length === 0 ? (
            <div className="notification is-warning">
              Ce produit ne contient aucun article.
            </div>
          ) : (
            <div className="columns is-multiline">
              {articles.map((article) => (
                <div key={article.id} className="column is-one-quarter">
                  <div className="card">
                    <header className="card-header">
                      <p className="card-header-title">{article.name}</p>
                    </header>
                    <div className="card-content">
                      <div className="content">{article.description}</div>
                      <div className="content">{article.price}</div>
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      </div>

    )


}