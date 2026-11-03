import { useNavigate } from 'react-router-dom';
import EventForm from '../components/forms/EventForm';
import { useEvents } from '../context/EventsContext';

export default function AddEventPage() {
    const { addEvent } = useEvents();
    const navigate = useNavigate();

    return (
        <section style={{ maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
            <h2>Etkinlik Ekle</h2>
            <EventForm
                submitText="Kaydet"
                onSubmit={(data) => {
                    addEvent(data);
                    navigate("/admin");
                }}
            />
        </section>
    );
}