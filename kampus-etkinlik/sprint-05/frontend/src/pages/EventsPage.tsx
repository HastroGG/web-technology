import { useState } from 'react';
import EventFilter from '../components/events/EventFilter';
import EventList from '../components/events/EventList';
import { useEvents } from '../context/EventsContext';
import type { Category } from '../types/page';
import { filterByCategory, searchEvents } from '../utils/filter-events';

export default function EventsPage() {
    const { events } = useEvents();
    const [searchText, setSearchText] = useState("");
    const [category, setCategory] = useState<Category | "">("");

    const categories = [...new Set(events.map((e) => e.category))];
    const aramaSonuclari = searchEvents(events, searchText);
    const filtered = filterByCategory(aramaSonuclari, category);

    return (
        <section>
            <h2>Tüm Etkinlikler</h2>
            <EventFilter
                searchText={searchText}
                onSearchChange={setSearchText}
                category={category}
                onCategoryChange={setCategory}
                categories={categories}
            />
            <EventList events={filtered} emptyText="Etkinlik bulunamadı." />
        </section>
    );
}