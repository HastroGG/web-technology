import { events } from "./data.js";

// Tarihi "12 Ekim 2026" formatına dönüştüren yardımcı fonksiyon
function formatDate(dateString) {
    const parts = dateString.split("-");
    if (parts.length === 3) {
        const dateObj = new Date(parts[2], parts[1] - 1, parts[0]);
        return dateObj.toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }
    return dateString;
}

// Bir etkinlik objesinden kart HTML'i üreten fonksiyon
function createCard(event) {
    const formattedDate = formatDate(event.date);
    
    return `
        <article class="etkinlik-karti">
            <h3><a href="etkinlik-detay.html?id=${event.id}">${event.title}</a></h3>
            <p>${event.category} - <time datetime="${event.date}">${formattedDate}</time> - ${event.location}</p>
        </article>
    `;
}

// DOM Elemanlarını Seçme
const list = document.querySelector("#etkinlik-listesi");
const filtreFormu = document.querySelector("#filtre-formu");
const aramaInput = document.querySelector("#arama");
const kategoriSelect = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc");

// Sayfayı doldurma / render etme fonksiyonu
function render(dizi) {
    if (!list) return;

    if (dizi.length === 0) {
        list.innerHTML = "<p>Aradığınız kriterlere uygun etkinlik bulunamadı.</p>";
    } else {
        list.innerHTML = dizi.map(createCard).join("");
    }
}

// Kategorileri Dinamik Olarak Doldurma (new Set kullanımı)
function kategorileriYukle() {
    if (!kategoriSelect) return;

    // Tekrarsız kategorileri al
    const kategoriler = [...new Set(events.map(e => e.category))];

    kategoriler.forEach(kategori => {
        const option = document.createElement("option");
        option.value = kategori;
        option.textContent = kategori;
        kategoriSelect.appendChild(option);
    });
}

// Filtreleme Fonksiyonu
function filtrele() {
    if (!aramaInput || !kategoriSelect) return;

    const aranan = aramaInput.value.trim().toLocaleLowerCase("tr-TR");
    const secilenKategori = kategoriSelect.value;

    const sonuc = events.filter(e => {
        const baslikUyuyor = e.title.toLocaleLowerCase("tr-TR").includes(aranan);
        const aciklamaUyuyor = e.description ? e.description.toLocaleLowerCase("tr-TR").includes(aranan) : false;
        const metinUyuyor = baslikUyuyor || aciklamaUyuyor;

        const kategoriUyuyor = secilenKategori === "" || e.category === secilenKategori;

        return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);

    // Sonuç Sayısı Metnini Güncelleme
    if (sonucSatiri) {
        if (sonuc.length > 0) {
            sonucSatiri.textContent = `${sonuc.length} etkinlik listeleniyor.`;
        } else {
            sonucSatiri.textContent = "Hiçbir etkinlik bulunamadı.";
        }
    }
}

// Başlangıç Mantığı
if (list) {
    if (list.dataset.limit) {
        // Ana Sayfa (index.html) -> İlk 2 Yaklaşan Etkinliği Göster
        const yaklasan = [...events]
            .sort((a, b) => a.date.localeCompare(b.date))
            .slice(0, Number(list.dataset.limit));
        
        render(yaklasan);
    } else {
        // Etkinlikler Sayfası (etkinlikler.html) -> Filtreleme ve Tüm Liste
        kategorileriYukle();
        render(events);

        if (sonucSatiri) {
            sonucSatiri.textContent = `${events.length} etkinlik listeleniyor.`;
        }

        // Event Listener'lar
        if (aramaInput) aramaInput.addEventListener("input", filtrele);
        if (kategoriSelect) kategoriSelect.addEventListener("change", filtrele);
        if (filtreFormu) {
            filtreFormu.addEventListener("submit", (e) => e.preventDefault());
        }
    }
}