import type { CampusEvent } from "../../types/campus-events";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
    event: CampusEvent;
}

export default function EventDetail({ event }: EventDetailProps) {
    return (
        <article className="etkinlik-detay-karti">
            {event.image && (
                <img 
                    src={event.image.startsWith('/') ? event.image : `/${event.image}`} 
                    alt={event.title} 
                    style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }} 
                />
            )}
            
            <h2>{event.title}</h2>
            <p style={{ fontWeight: 600, color: 'var(--renk-ana)', marginBottom: '12px' }}>
                {event.category}
            </p>
            <p><strong>Tarih:</strong> {formatDate(event.date)} - {event.time}</p>
            <p><strong>Yer:</strong> {event.location}</p>
            <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
            
            <div style={{ marginTop: '16px' }}>
                <h4>Açıklama</h4>
                <p>{event.description}</p>
            </div>
        </article>
    );
}