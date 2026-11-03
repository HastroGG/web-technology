import React, { createContext, useContext, useState } from 'react';
import { events as initialEvents } from '../data/events';
import type { CampusEvent, Category } from '../types/page';

interface EventFormData {
    title: string;
    category: Category | "";
    date: string;
    time: string;
    location: string;
    capacity: string;
    description: string;
    image?: string;
}

interface EventsContextValue {
    events: CampusEvent[];
    addEvent: (data: EventFormData) => void;
    updateEvent: (id: string, data: EventFormData) => void;
    deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

export function EventProvider({ children }: { children: React.ReactNode }) {
    const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

    function toEvent(id: string, data: EventFormData): CampusEvent {
        return {
            id,
            title: data.title.trim(),
            category: data.category as Category,
            date: data.date,
            time: data.time,
            location: data.location.trim(),
            capacity: Number(data.capacity),
            description: data.description.trim(),
            image: data.image?.trim() || undefined
        };
    }

    function addEvent(data: EventFormData) {
        setEvents((prev) => [...prev, toEvent(`event-${Date.now()}`, data)]);
    }

    function updateEvent(id: string, data: EventFormData) {
        setEvents((prev) => prev.map((e) => (e.id === id ? toEvent(id, data) : e)));
    }

    function deleteEvent(id: string) {
        setEvents((prev) => prev.filter((e) => e.id !== id));
    }

    return (
        <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
            {children}
        </EventsContext.Provider>
    );
}

export function useEvents() {
    const value = useContext(EventsContext);
    if (value === null) {
        throw new Error("Provider yok");
    }
    return value;
}