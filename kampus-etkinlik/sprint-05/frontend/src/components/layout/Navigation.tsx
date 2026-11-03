import { NavLink } from 'react-router-dom';

export default function Navigation() {
    return (
        <nav className="menu">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                Ana Sayfa
            </NavLink>
            <NavLink to="/events" className={({ isActive }) => (isActive ? 'active' : '')}>
                Etkinlikler
            </NavLink>
            <NavLink to="/admin" className={({ isActive }) => (isActive ? 'active' : '')}>
                Yönetim
            </NavLink>
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
                Giriş Yap
            </NavLink>
        </nav>
    );
}