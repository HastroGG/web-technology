import type { PageName } from "../../types/page";

interface NavigationProps {
    current: PageName;
    onNavigate: (page: PageName) => void;
}

export default function Navigation({ current, onNavigate }: NavigationProps) {
    return (
        <nav className="menu">
            <a
                href="#home"
                aria-current={current === "home" ? "page" : undefined}
                onClick={(e) => { e.preventDefault(); onNavigate("home"); }}
            >
                Ana Sayfa
            </a>
            <a
                href="#events"
                aria-current={current === "events" ? "page" : undefined}
                onClick={(e) => { e.preventDefault(); onNavigate("events"); }}
            >
                Etkinlikler
            </a>
            <a
                href="#add"
                aria-current={current === "add" ? "page" : undefined}
                onClick={(e) => { e.preventDefault(); onNavigate("add"); }}
            >
                Etkinlik Ekle
            </a>
        </nav>
    );
}