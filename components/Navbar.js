"use client";
import Link from 'next/link';
import 'bulma/css/bulma.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const Navbar = () => {
    return (
        <div>
            <nav className="navbar is-primary" role="navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item" href="/">MyApp</Link>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-start">
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                        <Link href="/categories/add" className="button is-light">
                            Ajouter une Catégorie
                        </Link>
                        <Link href="/articles/add" className="button is-light">
                            Ajouter un Article
                        </Link>
                        <Link href="/produits/add" className="button is-light">
                            Ajouter un produit
                        </Link>
                    </div>
                    </div>
            </div>
            </nav>
        </div>
    );
};

export default Navbar;