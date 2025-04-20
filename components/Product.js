import 'bulma/css/bulma.min.css';

export default function Article({ product ,onDelete ,onEdit,onSee}) {
    return (
        <div className="card">
        <header className="card-header">
          <p className="card-header-title">{product.name}</p>
          <button className="card-header-icon" aria-label="more options">
            <span className="icon">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </header>
        <div className="card-content">
          <div className="content">
            {product.description}
            <a href="#">{product.active}</a>
            <br />
          </div>
        </div>
        <footer className="card-footer">
        <button
          className="button is-primary card-footer-item"
          onClick={() => onSee(product.id)}
        >
          See
        </button>
            <button
            className="button is-info card-footer-item"
            onClick={() => onDelete(product.id)}
            style={{
            width: "48%", 
            }}
        >
            Delete
        </button>
        <button
            className="button is-warning card-footer-item"
            onClick={() => onEdit(product.id)}
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