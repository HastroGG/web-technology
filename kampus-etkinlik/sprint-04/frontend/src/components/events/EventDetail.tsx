import type { CampusEvent } from "../../types/campus-events";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
    event: CampusEvent;
    onBack: () => void;
    onEdit: (id: string) => void;
}

export default function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
    return (
        <article className="etkinlik-detay-karti">
            <h2>{event.title}</h2>
            <p style={{ fontSize: "1.1rem", color: "var(--renk-ana)", fontWeight: "bold", marginBottom: "15px" }}>
                {event.category}
            </p>

            {/* Etkinlik Görseli */}
            {event.image && (
                <div style={{ marginBottom: "20px", textAlign: "center" }}>
                    <img
                        src={event.image}
                        alt={event.title}
                        style={{
                            maxWidth: "100%",
                            maxHeight: "300px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            border: "1px solid #e2e8f0"
                        }}
                    />
                </div>
            )}

            <dl className="kunye">
                <dt>Tarih & Saat</dt>
                <dd>{formatDate(event.date)}, {event.time}</dd>

                <dt>Konum</dt>
                <dd>{event.location}</dd>

                <dt>Kontenjan</dt>
                <dd>{event.capacity} kişi</dd>
            </dl>

            <div style={{ marginTop: "20px" }}>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "8px" }}>Etkinlik Açıklaması</h3>
                <p style={{ color: "#475569", lineHeight: "1.6" }}>
                    {event.description || "Açıklama belirtilmemiş."}
                </p>
            </div>

            <div style={{ marginTop: "30px" }}>
                <a
                    href="#events"
                    className="geri-don"
                    onClick={(e) => { e.preventDefault(); onBack(); }}
                >
                    ← Etkinlik listesine dön
                </a>
                <div style={{ marginTop: "30px", display: "flex", gap: "15px", alignItems: "center" }}>
                    <button
                        className="btn"
                        style={{ backgroundColor: "#0284c7" }}
                        onClick={() => onEdit(event.id)}
                    >
                        ✏️ Etkinliği Düzenle
                    </button>
                </div>
            </div>
        </article>
    );
}