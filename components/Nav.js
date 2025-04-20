"use client";
import Link from 'next/link';
import 'bulma/css/bulma.min.css';
import { useRouter } from 'next/navigation';
import 'bootstrap-icons/font/bootstrap-icons.css';


export default function Nav() {
    const router = useRouter();
    return (
        <div>
        <nav className="navbar is-primary" role="navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" href="/">MyApp</Link>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    <button
                        className="button is-light"
                        onClick={() => router.back()} // Bouton pour revenir à la page précédente
                    >
                        <i className="bi bi-arrow-90deg-left"></i>
                    </button>
                </div>
            </div>
        </nav>
    </div>
    );
}