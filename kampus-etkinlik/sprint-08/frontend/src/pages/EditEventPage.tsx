import { useNavigate, useParams } from 'react-router-dom';
import EventForm from '../components/forms/EventForm';
import { useEvents } from '../context/EventsContext';
import NotFoundPage from './NotFoundPage';

export default function EditEventPage() {
    const { id } = useParams<{ id: string }>();
    const { events, updateEvent } = useEvents();
    const navigate = useNavigate();

    const event = events.find((e) => e.id === (id ?? ""));

    if (!event) {
        return <NotFoundPage />;
    }

    return (
        <section style={{ maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
            <h2>Etkinliği Düzenle</h2>
            <EventForm
                initialData={{
                    title: event.title,
                    category: event.category,
                    date: event.date,
                    time: event.time,
                    location: event.location,
                    capacity: String(event.capacity),
                    description: event.description,
                    image: event.image
                }}
                submitText="Güncelle"
                onSubmit={(data) => {
                    updateEvent(event.id, data);
                    navigate("/admin");
                }}
            />
        </section>
    );
}