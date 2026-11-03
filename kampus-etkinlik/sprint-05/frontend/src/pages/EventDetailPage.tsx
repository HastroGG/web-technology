import { Link, useParams } from 'react-router-dom';
import EventDetail from '../components/events/EventDetail';
import { useEvents } from '../context/EventsContext';
import NotFoundPage from './NotFoundPage';

export default function EventDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { events } = useEvents();
    
    const event = events.find((e) => e.id === (id ?? ""));

    if (!event) {
        return <NotFoundPage />;
    }

    return (
        <section>
            <h2>{event.title}</h2>
            <EventDetail event={event} />
            <div style={{ marginTop: '20px' }}>
    <Link to="/events">← Listeye dön</Link> | <Link to={`/admin/${event.id}/edit`}>Güncelle</Link>
</div>
        </section>
    );
}