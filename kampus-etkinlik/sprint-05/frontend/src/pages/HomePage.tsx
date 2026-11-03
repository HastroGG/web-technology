import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';
import EventCard from '../components/events/EventCard';

export default function HomePage() {
    const { events } = useEvents();
    const featuredEvents = events.slice(0, 3); // İlk 3 etkinlik öne çıkanlar
    useEffect(() => {
        document.title = "Ana Sayfa - Kampüs Etkinlikleri";
    }, []);
    return (
        <div>
            <section style={{ marginBottom: '30px', textAlign: 'center' }}>
                <h2>Kampüsteki Etkinlikleri Keşfedin</h2>
                <p>Üniversitemizdeki tüm akademik, kültürel ve sosyal etkinliklerden haberdar olun.</p>
                <Link to="/events" className="btn" style={{ display: 'inline-block', marginTop: '10px', textDecoration: 'none' }}>
                    Tüm Etkinlikleri Gör
                </Link>
            </section>

            <section>
                <h3>Öne Çıkan Etkinlikler</h3>
                <div className="etkinlik-grid">
                    {featuredEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </section>
        </div>
    );
}