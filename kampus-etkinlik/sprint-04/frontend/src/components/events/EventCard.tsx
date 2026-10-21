import type { CampusEvent } from "../../types/campus-events";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
    event: CampusEvent;
    onShowDetail: (id: string) => void;
}

export default function EventCard({ event, onShowDetail }: EventCardProps) {
    return (
        <article className="etkinlik-karti">
            <h3>
                <a href="#" onClick={(e) => { e.preventDefault(); onShowDetail(event.id); }}>
                    {event.title}
                </a>
            </h3>
            <p>{event.category} — {formatDate(event.date)}, {event.time} — {event.location}</p>
            <p style={{ marginTop: "8px", fontSize: "0.9rem", color: "#475569" }}>Kontenjan: {event.capacity} kişi</p>
        </article>
    );
}