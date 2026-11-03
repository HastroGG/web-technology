import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';

export default function AdminPage() {
    const { events, deleteEvent } = useEvents();

    return (
        <section style={{ padding: '20px' }}>
            <h2>Etkinlik Yönetimi</h2>
            <Link to="/admin/new" className="btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                + Yeni etkinlik
            </Link>
            {events.length === 0 ? (
                <p>Henüz etkinlik yok.</p>
            ) : (
                <table className="tablo" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{color: '#fff' }}>
                            <th style={{ padding: '10px' }}>Etkinlik</th>
                            <th>Tarih</th>
                            <th>Kategori</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((ev) => (
                            <tr key={ev.id} style={{ borderBottom: '1px solid #ddd' }}>
                                <td data-baslik="Etkinlik" style={{ padding: '10px' }}>{ev.title}</td>
                                <td data-baslik="Tarih">{ev.date}</td>
                                <td data-baslik="Kategori">{ev.category}</td>
                                <td data-baslik="İşlemler" className="islemler">
                                    <Link to={`/admin/${ev.id}/edit`} style={{ marginRight: '10px', background: 'var(--renk-ana)', color: '#fff', padding: '5px 10px', textDecoration: 'none', borderRadius: '4px' }}>Düzenle</Link>
<button onClick={() => deleteEvent(ev.id)} className="buton-sil" style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 10px', cursor: 'pointer', borderRadius: '4px' }}>Sil</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}