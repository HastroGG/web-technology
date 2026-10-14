

import React, { useState } from 'react';
import { events } from './data/events';
import { searchEvents, filterByCategory, findEventById } from './utils/filter-events';
import type { CampusEvent, Category } from './types/campus-events';
import './App.css';

type PageName = "home" | "events" | "detail" | "add";

export default function App() {
    const [page, setPage] = useState<PageName>("home");
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // Arama ve Kategori State'leri (Etkinlikler Sayfası İçin)
    const [aramaMetni, setAramaMetni] = useState<string>("");
    const [secilenKategori, setSecilenKategori] = useState<Category | "">("");
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State'leri (Yeni Etkinlik Ekle Sayfası İçin)
    const [formData, setFormData] = useState({
        title: "",
        category: "Seminer" as Category,
        date: "",
        time: "",
        location: "",
        capacity: "",
        description: ""
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [formMesaj, setFormMesaj] = useState<{ tip: "basari" | "hata"; metin: string; veri?: any } | null>(null);

    // Sayfa değiştirme fonksiyonu
    function go(next: PageName, id: string | null = null) {
        setPage(next);
        setSelectedId(id);
        window.scrollTo(0, 0);
    }

    // Tarih biçimlendirme yardımcı fonksiyonu
    function formatDate(dateString: string) {
        const parts = dateString.split("-");
        if (parts.length === 3) {
            const dateObj = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
            return dateObj.toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });
        }
        return dateString;
    }

    // Kart render fonksiyonu (Ana Sayfa ve Liste için ortak)
    function renderCard(event: CampusEvent) {
        return (
            <article className="etkinlik-karti" key={event.id}>
                <h3>
                    <a href="#" onClick={(e) => { e.preventDefault(); go("detail", event.id); }}>
                        {event.title}
                    </a>
                </h3>
                <p>{event.category} — {formatDate(event.date)}, {event.time} — {event.location}</p>
                <p style={{ marginTop: "8px", fontSize: "0.9rem", color: "#475569" }}>Kontenjan: {event.capacity} kişi</p>
            </article>
        );
    }

    // Form Gönderim Yönetimi
    function handleFormSubmit(e: React.FormEvent) {
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

        if (editingId) {
            // --- GÜNCELLEME İŞLEMİ ---
            const index = events.findIndex(ev => ev.id === editingId);
            if (index !== -1) {
                events[index] = {
                    ...events[index],
                    title: formData.title.trim(),
                    category: formData.category,
                    date: formData.date,
                    time: formData.time,
                    location: formData.location.trim(),
                    capacity: capNum,
                    description: formData.description.trim(),
                    image: formData.image.trim() || undefined
                };
            }
            setFormMesaj({ tip: "basari", metin: "Etkinlik başarıyla güncellendi!" });
            setEditingId(null);
        } else {
            // --- YENİ EKLEME İŞLEMİ ---
            const yeniEtkinlik: CampusEvent = {
                id: `event-${Date.now()}`,
                title: formData.title.trim(),
                category: formData.category,
                date: formData.date,
                time: formData.time,
                location: formData.location.trim(),
                capacity: capNum,
                description: formData.description.trim(),
                image: formData.image.trim() || undefined
            };
            events.unshift(yeniEtkinlik);
            setFormMesaj({ tip: "basari", metin: "Etkinlik başarıyla oluşturuldu!" });
        }

        setFormErrors({});
    }

    function handleEditClick(event: CampusEvent) {
        setFormData({
            title: event.title,
            category: event.category,
            date: event.date,
            time: event.time,
            location: event.location,
            capacity: event.capacity.toString(),
            description: event.description || "",
            image: event.image || ""
        });
        setEditingId(event.id);
        go("add");
    }

    // Filtreleme hesaplamaları
    const kategoriler = [...new Set(events.map(e => e.category))];
    const aramaSonuclari = searchEvents(events, aramaMetni);
    const filtrelenmisEtkinlikler = filterByCategory(aramaSonuclari, secilenKategori);

    // Yaklaşan 2 etkinlik (Ana Sayfa İçin)
    const upcoming = [...events]
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, 2);

    // Detay sayfası için seçilen etkinlik
    const detayEtkinlik = selectedId ? findEventById(events, selectedId) : undefined;

    return (
        <>
            {/* HEADER VE NAVİGASYON */}
            <header className="site-baslik">
                <h1>Kampüs Etkinlikleri</h1>
                <nav className="menu">
                    <a
                        href="#home"
                        aria-current={page === "home" ? "page" : undefined}
                        onClick={(e) => { e.preventDefault(); go("home"); }}
                    >
                        Ana Sayfa
                    </a>
                    <a
                        href="#events"
                        aria-current={page === "events" ? "page" : undefined}
                        onClick={(e) => { e.preventDefault(); go("events"); }}
                    >
                        Etkinlikler
                    </a>
                    <a
                        href="#add"
                        aria-current={page === "add" ? "page" : undefined}
                        onClick={(e) => {
                            e.preventDefault();
                            setEditingId(null); // Düzenleme modunu kapat
                            setFormData({       // Formu tamamen temizle
                                title: "",
                                category: "Seminer",
                                date: "",
                                time: "",
                                location: "",
                                capacity: "",
                                description: "",
                                image: ""
                            });
                            setFormErrors({});   // Hataları temizle
                            setFormMesaj(null);  // Önceki mesajları kaldır
                            go("add");           // Sayfaya git
                        }}
                    >
                        Etkinlik Ekle
                    </a>
                </nav>
            </header>

            {/* ANA İÇERİK ALANI */}
            <main>
                {/* 1. ANA SAYFA */}
                {page === "home" && (
                    <section className="yaklasan-etkinlikler">
                        <h2>Yaklaşan Etkinlikler</h2>
                        <p style={{ color: "#64748b", marginBottom: "20px" }}>Kampüsümüzde gerçekleşecek en yakın etkinlikleri aşağıda inceleyebilirsiniz.</p>
                        <div className="etkinlik-grid">
                            {upcoming.map(renderCard)}
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <a href="#events" className="tumunu-gor" onClick={(e) => { e.preventDefault(); go("events"); }}>
                                Tüm etkinlikleri görüntüle →
                            </a>
                        </div>
                    </section>
                )}

                {/* 2. ETKİNLİKLER LİSTESİ VE FİLTRELEME */}
                {page === "events" && (
                    <section>
                        <h2>Tüm Etkinlikler</h2>

                        {/* Filtre Formu */}
                        <div className="filtre">
                            <div className="filtre-grup">
                                <label htmlFor="arama">Etkinlik Ara</label>
                                <input
                                    type="search"
                                    id="arama"
                                    placeholder="Başlık veya açıklamada ara..."
                                    value={aramaMetni}
                                    onChange={(e) => setAramaMetni(e.target.value)}
                                />
                            </div>

                            <div className="filtre-grup">
                                <label htmlFor="kategori-filtre">Kategori</label>
                                <select
                                    id="kategori-filtre"
                                    value={secilenKategori}
                                    onChange={(e) => setSecilenKategori(e.target.value as Category | "")}
                                >
                                    <option value="">Tümü</option>
                                    {kategoriler.map(kat => (
                                        <option key={kat} value={kat}>{kat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Sonuç Sayısı */}
                        <p id="sonuc">
                            {filtrelenmisEtkinlikler.length > 0
                                ? `${filtrelenmisEtkinlikler.length} etkinlik listeleniyor.`
                                : "Aradığınız kriterlere uygun etkinlik bulunamadı."}
                        </p>

                        {/* Kart Grid */}
                        <div className="etkinlik-grid">
                            {filtrelenmisEtkinlikler.map(renderCard)}
                        </div>
                    </section>
                )}

                {/* 3. ETKİNLİK DETAY SAYFASI */}
                {page === "detail" && (
                    <>
                        {detayEtkinlik ? (
                            <article className="etkinlik-detay-karti">
                                <h2>{detayEtkinlik.title}</h2>
                                <p style={{ fontSize: "1.1rem", color: "var(--renk-ana)", fontWeight: "bold", marginBottom: "15px" }}>
                                    {detayEtkinlik.category}
                                </p>

                                {/* Etkinlik Görseli (Eğer tanımlandıysa gösterilir) */}
                                {detayEtkinlik.image && (
                                    <div style={{ marginBottom: "20px", textAlign: "center" }}>
                                        <img
                                            src={detayEtkinlik.image}
                                            alt={detayEtkinlik.title}
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
                                    <dd>{formatDate(detayEtkinlik.date)}, {detayEtkinlik.time}</dd>

                                    <dt>Konum</dt>
                                    <dd>{detayEtkinlik.location}</dd>

                                    <dt>Kontenjan</dt>
                                    <dd>{detayEtkinlik.capacity} kişi</dd>
                                </dl>

                                <div style={{ marginTop: "20px" }}>
                                    <h3 style={{ fontSize: "1.2rem", marginBottom: "8px" }}>Etkinlik Açıklaması</h3>
                                    <p style={{ color: "#475569", lineHeight: "1.6" }}>
                                        {detayEtkinlik.description || "Açıklama belirtilmemiş."}
                                    </p>
                                </div>

                                <div style={{ marginTop: "30px" }}>
                                    <a href="#events" className="geri-don" onClick={(e) => { e.preventDefault(); go("events"); }}>
                                        ← Etkinlik listesine dön
                                    </a>
                                    <div style={{ marginTop: "30px", display: "flex", gap: "15px", alignItems: "center" }}>
                                        <button
                                            className="btn"
                                            style={{ backgroundColor: "#0284c7" }}
                                            onClick={() => handleEditClick(detayEtkinlik)}
                                        >
                                            ✏️ Etkinliği Düzenle
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ) : (
                            <div className="hata-kutusu">
                                <h2>Etkinlik Bulunamadı</h2>
                                <p>Aradığınız etkinlik mevcut değil veya kaldırılmış olabilir.</p>
                                <a href="#events" onClick={(e) => { e.preventDefault(); go("events"); }}>
                                    Etkinlik listesine dön
                                </a>
                            </div>
                        )}
                    </>
                )}

                {/* 4. YENİ ETKİNLİK EKLEME SAYFASI */}
                {page === "add" && (
                    <section className="form-section">
                        <h2>{editingId ? "Etkinliği Düzenle" : "Yeni Etkinlik Ekle"}</h2>
                        <form onSubmit={handleFormSubmit} noValidate>
                            <div className="form-group">
                                <label htmlFor="title">Etkinlik Adı</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    aria-invalid={formErrors.title ? "true" : "false"}
                                />
                                <span className="hata-mesaji">{formErrors.title}</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category">Kategori</label>
                                <select
                                    id="category"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                                >
                                    {kategoriler.map(kat => (
                                        <option key={kat} value={kat}>{kat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="date">Tarih</label>
                                <input
                                    type="date"
                                    id="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    aria-invalid={formErrors.date ? "true" : "false"}
                                />
                                <span className="hata-mesaji">{formErrors.date}</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="time">Saat</label>
                                <input
                                    type="time"
                                    id="time"
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    aria-invalid={formErrors.time ? "true" : "false"}
                                />
                                <span className="hata-mesaji">{formErrors.time}</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="location">Konum / Yer</label>
                                <input
                                    type="text"
                                    id="location"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    aria-invalid={formErrors.location ? "true" : "false"}
                                />
                                <span className="hata-mesaji">{formErrors.location}</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="capacity">Kapasite</label>
                                <input
                                    type="number"
                                    id="capacity"
                                    value={formData.capacity}
                                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                    aria-invalid={formErrors.capacity ? "true" : "false"}
                                />
                                <span className="hata-mesaji">{formErrors.capacity}</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Açıklama</label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>

                            <button type="submit" className="btn">Etkinliği Kaydet</button>
                        </form>

                        {formMesaj && (
                            <div className={formMesaj.tip === "hata" ? "mesaj-hata" : "mesaj-basari"}>
                                <p><strong>{formMesaj.metin}</strong></p>
                            </div>
                        )}
                    </section>
                )}
            </main>

            {/* FOOTER */}
            <footer>
                <p>Ramazan Harun Ergene — 2416501030 — <time dateTime="2026-10-14">14 Ekim 2026</time></p>
            </footer>
        </>
    );
}