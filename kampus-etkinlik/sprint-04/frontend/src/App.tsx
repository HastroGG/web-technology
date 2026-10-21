import React, { useState } from 'react';
import { events } from './data/events';
import { searchEvents, filterByCategory, findEventById } from './utils/filter-events';
import type { CampusEvent, Category } from './types/page';
import './App.css';

//yeni eklediğimiz import kısımları
import type { PageName } from './types/page';
import Footer from './components/layout/Footer';
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

export default function App() {
    const [page, setPage] = useState<PageName>("home");
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [aramaMetni, setAramaMetni] = useState<string>("");
    const [secilenKategori, setSecilenKategori] = useState<Category | "">("");
    const [editingId, setEditingId] = useState<string | null>(null);

    function go(next: PageName, id: string | null = null) {
        setPage(next);
        setSelectedId(id);
        window.scrollTo(0, 0);
    }

    function handleFormSubmit(formData: any, editId: string | null) {
        const capNum = Number(formData.capacity);
        if (editId) {
            const index = events.findIndex(ev => ev.id === editId);
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
            setEditingId(null);
        } else {
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
        }
        go("events");
    }

    const kategoriler = [...new Set(events.map(e => e.category))];
    const aramaSonuclari = searchEvents(events, aramaMetni);
    const filtrelenmisEtkinlikler = filterByCategory(aramaSonuclari, secilenKategori);
    const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);
    const detayEtkinlik = selectedId ? findEventById(events, selectedId) : undefined;
    const editingEvent = editingId ? findEventById(events, editingId) : null;

    let headerTitle = "Kampüs Etkinlikleri";
    let headerText = page === "events" ? "Tüm Etkinlikler" : page === "add" ? "Yeni Etkinlik Oluştur" : "";

    return (
        <>
            <Header title={headerTitle} text={headerText}>
                <Navigation
                    current={page}
                    onNavigate={(nextPage) => {
                        if (nextPage === "add") {
                            setEditingId(null);
                        }
                        go(nextPage);
                    }}
                /></Header>

            <main>
                {page === "home" && (
                    <section className="yaklasan-etkinlikler">
                        <h2>Yaklaşan Etkinlikler</h2>
                        <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
                        <a href="#events" onClick={(e) => { e.preventDefault(); go("events"); }}>Tüm etkinlikleri görüntüle →</a>
                    </section>
                )}

                {page === "events" && (
                    <section>
                        <h2>Tüm Etkinlikler</h2>
                        <EventFilter searchText={aramaMetni} onSearchChange={setAramaMetni} category={secilenKategori} onCategoryChange={setSecilenKategori} categories={kategoriler} />
                        <EventList events={filtrelenmisEtkinlikler} onShowDetail={(id) => go("detail", id)} emptyText="Etkinlik bulunamadı." />
                    </section>
                )}

                {page === "detail" && detayEtkinlik && (
                    <EventDetail event={detayEtkinlik} onBack={() => go("events")} onEdit={(id) => { setEditingId(id); go("add"); }} />
                )}

                {page === "add" && (
                    <section className="form-section">
                        <h2>{editingId ? "Etkinliği Düzenle" : "Yeni Etkinlik Ekle"}</h2>
                        <EventForm editingEvent={editingEvent} onSubmit={handleFormSubmit} />
                    </section>
                )}
            </main>

            <Footer />
        </>
    );
}