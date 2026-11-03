import type { CampusEvent } from "../../types/campus-events";
import { formatDate } from "../../utils/format-date";
import { Link } from "react-router-dom";

interface EventCardProps {
    event: CampusEvent;
}

export default function EventCard({ event }: EventCardProps) {
    return (
        <article className="etkinlik-karti">
            <h3>
                <Link to={`/events/${event.id}`}>
                    {event.title}
                </Link>
            </h3>
            <p>{event.category} — {formatDate(event.date)}, {event.time} — {event.location}</p>
            <p style={{ marginTop: "8px", fontSize: "0.9rem", color: "#475569" }}>Kontenjan: {event.capacity} kişi</p>
        </article>
    );
}