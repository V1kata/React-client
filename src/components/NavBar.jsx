import { Link } from 'react-router-dom';

export function NavBar() {
    return (
        <header>
            <nav className="dropdown">
                <img src="/images/dropdown.svg" alt="" />
                <ul>
                    <li><Link to="/create">Create</Link></li>
                    <li><Link to="/catalog">Catalog</Link></li>
                </ul>
            </nav>
        </header>
    )
}