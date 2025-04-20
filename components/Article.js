import 'bulma/css/bulma.min.css';

export default function Article({ article ,onDelete ,onEdit}) {
    return (
        <div className="card">
        <header className="card-header">
          <p className="card-header-title">{article.name}</p>
          <button className="card-header-icon" aria-label="more options">
            <span className="icon">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </header>
        <div className="card-content">
          <div className="content">
            {article.description}
            <a href="#">{article.active}</a>
            <br />
            <p>{article.price}</p>
          </div>
        </div>
        <footer className="card-footer">
            <button
            className="button is-info card-footer-item"
            onClick={() => onDelete(article.id)}
            style={{
            width: "48%", 
            }}
        >
            Delete
        </button>
        <button
            className="button is-warning card-footer-item"
            onClick={() => onEdit(article.id)}
            style={{
            width: "48%", 
            }}
        >
            Edit
        </button>
        </footer>
      </div>
    );
}