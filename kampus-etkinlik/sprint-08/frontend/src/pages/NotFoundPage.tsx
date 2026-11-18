import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    useEffect(() => {
            document.title = "Sayfa Bulunamadı - Kampüs Etkinlikleri";
        }, []);
    return (
        <section style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Sayfa bulunamadı.</h2>
            <p>Aradığınız sayfa ya da etkinlik yok.</p>
            <Link to="/" className="buton" style={{ background: '#556b2f', color: '#fff', padding: '10px 20px', textDecoration: 'none', display: 'inline-block', marginTop: '15px' }}>
                Ana sayfaya dön
            </Link>
        </section>
    );
}