import React, { useState } from 'react';
import type { Category, CampusEvent } from '../../types/page';

interface EventFormProps {
    initialData?: {
        title: string;
        category: Category | "";
        date: string;
        time: string;
        location: string;
        capacity: string;
        description: string;
        image?: string;
    };
    submitText?: string;
    onSubmit: (data: any) => void;
    editingEvent?: CampusEvent | null;
}

export default function EventForm({ initialData, submitText = "Kaydet", onSubmit }: EventFormProps) {
    const [data, setData] = useState(
        initialData || {
            title: "",
            category: "",
            date: "",
            time: "",
            location: "",
            capacity: "",
            description: "",
            image: ""
        }
    );

    const [errors, setErrors] = useState<Record<string, string>>({});

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    function formatDateForInput(dateStr: string) {
        if (!dateStr) return "";
        if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) return dateStr; // Zaten bu formattsa dokunma
        const parts = dateStr.split("-");
        if (parts.length === 3) {
            return `${parts[2]}-${parts[1]}-${parts[0]}`; // GG-AA-YYYY -> YYYY-MM-DD
        }
        return dateStr;
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const found: Record<string, string> = {};

        if (data.title.trim().length < 3) {
            found.title = "En az 3 karakter olmalı.";
        }
        if (!data.category) {
            found.category = "Bir kategori seçin.";
        }
        if (!data.date || !data.time || !data.location.trim()) {
            if (!data.date) found.date = "Tarih boş olamaz.";
            if (!data.time) found.time = "Saat boş olamaz.";
            if (!data.location.trim()) found.location = "Yer boş olamaz.";
        }
        const capNum = Number(data.capacity);
        if (!Number.isInteger(capNum) || capNum < 1 || capNum > 1000) {
            found.capacity = "1 ile 1000 arası tam sayı.";
        }
        if (data.description.trim().length < 10) {
            found.description = "Açıklama en az 10 karakter olmalı.";
        }

        setErrors(found);

        if (Object.keys(found).length === 0) {
            onSubmit(data);
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="form">
            <div className="form-group">
                <label htmlFor="title">Etkinlik Adı</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={data.title}
                    onChange={handleChange}
                    aria-invalid={errors.title ? true : undefined}
                />
                {errors.title && <span className="hata-metni" style={{ color: 'red', fontSize: '12px' }}>{errors.title}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="category">Kategori</label>
                <select
                    id="category"
                    name="category"
                    value={data.category}
                    onChange={handleChange}
                    aria-invalid={errors.category ? true : undefined}
                >
                    <option value="">Seçiniz</option>
                    <option value="Seminer">Seminer</option>
                    <option value="Atölye">Atölye</option>
                    <option value="Teknoloji">Teknoloji</option>
                    <option value="Kariyer">Kariyer</option>
                    <option value="Yarışma">Yarışma</option>
                </select>
                {errors.category && <span className="hata-metni" style={{ color: 'red', fontSize: '12px' }}>{errors.category}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="date">Tarih</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={data.date}
                    onChange={handleChange}
                    aria-invalid={errors.date ? true : undefined}
                />
                {errors.date && <span className="hata-metni" style={{ color: 'red', fontSize: '12px' }}>{errors.date}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="time">Saat</label>
                <input
                    type="time"
                    id="time"
                    name="time"
                    value={data.time}
                    onChange={handleChange}
                    aria-invalid={errors.time ? true : undefined}
                />
                {errors.time && <span className="hata-metni" style={{ color: 'red', fontSize: '12px' }}>{errors.time}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="location">Yer</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={data.location}
                    onChange={handleChange}
                    aria-invalid={errors.location ? true : undefined}
                />
                {errors.location && <span className="hata-metni" style={{ color: 'red', fontSize: '12px' }}>{errors.location}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="capacity">Kontenjan</label>
                <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    value={data.capacity}
                    onChange={handleChange}
                    aria-invalid={errors.capacity ? true : undefined}
                />
                {errors.capacity && <span className="hata-metni" style={{ color: 'red', fontSize: '12px' }}>{errors.capacity}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="description">Açıklama</label>
                <textarea
                    id="description"
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                    aria-invalid={errors.description ? true : undefined}
                />
                {errors.description && <span className="hata-metni" style={{ color: 'red', fontSize: '12px' }}>{errors.description}</span>}
            </div>

            <button type="submit" className="buton" style={{ color: '#fff', padding: '10px 15px', border: 'none', cursor: 'pointer' }}>
                {submitText}
            </button>
        </form>
    );
}