import React, { useState } from 'react';
import type { CampusEvent, Category } from '../../types/campus-events';

interface EventFormProps {
    editingEvent?: CampusEvent | null;
    onSubmit: (formData: any, editingId: string | null) => void;
}

export default function EventForm({ editingEvent, onSubmit }: EventFormProps) {
    const [formData, setFormData] = useState({
        title: editingEvent?.title || "",
        category: editingEvent?.category || ("Seminer" as Category),
        date: editingEvent?.date ? editingEvent.date.split("T")[0] : "",
        time: editingEvent?.time || "",
        location: editingEvent?.location || "",
        capacity: editingEvent?.capacity ? editingEvent.capacity.toString() : "",
        description: editingEvent?.description || "",
        image: editingEvent?.image || ""
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [formMesaj, setFormMesaj] = useState<{ tip: "basari" | "hata"; metin: string } | null>(null);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const errors: Record<string, string> = {};

        if (!formData.title.trim() || formData.title.trim().length < 3) {
            errors.title = "Etkinlik adı en az 3 karakter olmalıdır.";
        }
        if (!formData.date) {
            errors.date = "Tarih alanı boş bırakılamaz.";
        }
        if (!formData.time) {
            errors.time = "Saat alanı boş bırakılamaz.";
        }
        if (!formData.location.trim()) {
            errors.location = "Konum alanı boş bırakılamaz.";
        }
        const capNum = Number(formData.capacity);
        if (!formData.capacity || isNaN(capNum) || capNum < 1 || capNum > 1000) {
            errors.capacity = "Kapasite 1 ile 1000 arasında bir sayı olmalıdır.";
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setFormMesaj({ tip: "hata", metin: "Lütfen formdaki hatalı alanları düzeltin." });
            return;
        }

        setFormErrors({});
        onSubmit(formData, editingEvent ? editingEvent.id : null);
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            {formMesaj && (
                <div style={{ padding: "10px", marginBottom: "15px", background: formMesaj.tip === "hata" ? "#fee2e2" : "#d1fae5", color: formMesaj.tip === "hata" ? "#991b1b" : "#065f46", borderRadius: "6px" }}>
                    {formMesaj.metin}
                </div>
            )}

            <div className="form-group">
                <label htmlFor="title">Etkinlik Adı</label>
                <input 
                    type="text" 
                    id="title" 
                    value={formData.title} 
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                    placeholder="Örn. Kariyer Günleri 2026" 
                />
                {formErrors.title && <span style={{ color: "red", fontSize: "12px" }}>{formErrors.title}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="category">Kategori</label>
                <select 
                    id="category" 
                    value={formData.category} 
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                >
                    <option value="Seminer">Seminer</option>
                    <option value="Atölye">Atölye</option>
                    <option value="Teknoloji">Teknoloji</option>
                    <option value="Kariyer">Kariyer</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="date">Tarih</label>
                <input 
                    type="date" 
                    id="date" 
                    value={formData.date} 
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })} 
                />
                {formErrors.date && <span style={{ color: "red", fontSize: "12px" }}>{formErrors.date}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="time">Saat</label>
                <input 
                    type="time" 
                    id="time" 
                    value={formData.time} 
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })} 
                />
                {formErrors.time && <span style={{ color: "red", fontSize: "12px" }}>{formErrors.time}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="location">Yer</label>
                <input 
                    type="text" 
                    id="location" 
                    value={formData.location} 
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
                    placeholder="Örn. A Blok Konferans Salonu" 
                />
                {formErrors.location && <span style={{ color: "red", fontSize: "12px" }}>{formErrors.location}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="capacity">Kapasite</label>
                <input 
                    type="number" 
                    id="capacity" 
                    value={formData.capacity} 
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} 
                    placeholder="Örn. 150" 
                />
                {formErrors.capacity && <span style={{ color: "red", fontSize: "12px" }}>{formErrors.capacity}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="description">Açıklama</label>
                <textarea 
                    id="description" 
                    value={formData.description} 
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                    placeholder="Etkinlik hakkında detaylar..." 
                />
            </div>

            <button type="submit" className="btn">
                {editingEvent ? "Etkinliği Güncelle" : "Etkinliği Kaydet"}
            </button>
        </form>
    );
}