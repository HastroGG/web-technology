import type { Category } from "../../types/campus-events";

interface EventFilterProps {
    searchText: string;
    onSearchChange: (value: string) => void;
    category: Category | "";
    onCategoryChange: (category: Category | "") => void;
    categories: (Category | string)[];
}

export default function EventFilter({
    searchText,
    onSearchChange,
    category,
    onCategoryChange,
    categories
}: EventFilterProps) {
    return (
        <div className="filtre">
            <div className="filtre-grup">
                <label htmlFor="arama">Etkinlik Ara</label>
                <input
                    type="search"
                    id="arama"
                    placeholder="Başlık veya açıklamada ara..."
                    value={searchText}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className="filtre-grup">
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                    id="kategori-filtre"
                    value={category}
                    onChange={(e) => onCategoryChange(e.target.value as Category | "")}
                >
                    <option value="">Tümü</option>
                    {categories.map(kat => (
                        <option key={kat} value={kat}>{kat}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}