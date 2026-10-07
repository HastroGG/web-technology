import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const formMesaj = document.querySelector("#form-mesaj");

if (form) {
    // --- ADIM 11: Güncelleme Modu Kontrolü ---
    if (form.dataset.mode === "guncelle") {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        const etkinlik = events.find(e => e.id === id);

        if (etkinlik) {
            // Formu var olan etkinliğin bilgileriyle doldur
            form.elements.ad.value = etkinlik.title;
            form.elements.kategori.value = etkinlik.category;
            
            // Tarih DD-MM-YYYY formatındaysa YYYY-MM-DD input formatına çeviriyoruz
            if (etkinlik.date.includes("-")) {
                const parts = etkinlik.date.split("-");
                if (parts[0].length === 2) {
                    form.elements.tarih.value = `${parts[2]}-${parts[1]}-${parts[0]}`;
                } else {
                    form.elements.tarih.value = etkinlik.date;
                }
            }
            
            form.elements.saat.value = etkinlik.time;
            form.elements.konum.value = etkinlik.location;
            form.elements.kapasite.value = etkinlik.capacity;
            form.elements.aciklama.value = etkinlik.description || "";
        } else {
            // ID yoksa veya yanlışsa formu gizle ve uyarı göster
            form.outerHTML = `
                <div class="hata-kutusu">
                    <h3>Güncellenecek Etkinlik Bulunamadı</h3>
                    <p>Lütfen güncellemek istediğiniz etkinliği detay sayfasından seçiniz.</p>
                    <a href="etkinlikler.html">Etkinliklere Git</a>
                </div>
            `;
        }
    }

    // --- FORM GÖNDERME VE DOĞRULAMA (Ekle/Güncelle Ortak) ---
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        temizleHatalar();

        const fd = new FormData(form);

        const data = {
            id: form.dataset.mode === "guncelle" 
                ? new URLSearchParams(window.location.search).get("id") 
                : `event-${Date.now()}`,
            title: fd.get("ad") ? fd.get("ad").trim() : "",
            category: fd.get("kategori") || "",
            date: fd.get("tarih") || "",
            time: fd.get("saat") || "",
            location: fd.get("konum") ? fd.get("konum").trim() : "",
            capacity: fd.get("kapasite") ? Number(fd.get("kapasite")) : "",
            description: fd.get("aciklama") ? fd.get("aciklama").trim() : ""
        };

        const errors = {};

        if (data.title.length < 3) {
            errors.ad = "En az 3 karakter olmalı.";
            hataIşaretle("ad", errors.ad);
        }

        if (!data.category) {
            errors.kategori = "Lütfen bir kategori seçiniz.";
            hataIşaretle("kategori", errors.kategori);
        }

        if (!data.date) {
            errors.tarih = "Tarih boş bırakılamaz.";
            hataIşaretle("tarih", errors.tarih);
        }

        if (!data.time) {
            errors.saat = "Saat boş bırakılamaz.";
            hataIşaretle("saat", errors.saat);
        }

        if (!data.location) {
            errors.konum = "Yer boş bırakılamaz.";
            hataIşaretle("konum", errors.konum);
        }

        if (data.capacity !== "") {
            const numCap = Number(data.capacity);
            if (isNaN(numCap) || numCap < 1 || numCap > 1000) {
                errors.kapasite = "1-1000 arasında olmalı.";
                hataIşaretle("kapasite", errors.kapasite);
            }
        }

        if (Object.keys(errors).length > 0) {
            if (formMesaj) {
                formMesaj.className = "mesaj-hata";
                formMesaj.textContent = "Formda hatalı alanlar var!";
            }
            return;
        }

        if (formMesaj) {
            formMesaj.className = "mesaj-basari";
            formMesaj.innerHTML = `
                <p><strong>${form.dataset.mode === "guncelle" ? "Etkinlik Güncellendi!" : "Etkinlik Oluşturuldu!"}</strong></p>
                <pre>${JSON.stringify(data, null, 2)}</pre>
            `;
        }
    });
}

function hataIşaretle(fieldName, mesaj) {
    const inputEl = document.getElementById(fieldName);
    const errorEl = document.getElementById(`${fieldName}-hata`);

    if (inputEl) inputEl.setAttribute("aria-invalid", "true");
    if (errorEl) errorEl.textContent = mesaj;
}

function temizleHatalar() {
    const hataliInputlar = form.querySelectorAll("[aria-invalid]");
    hataliInputlar.forEach(input => input.removeAttribute("aria-invalid"));

    const hataSpanlari = form.querySelectorAll(".hata-mesaji");
    hataSpanlari.forEach(span => span.textContent = "");

    if (formMesaj) {
        formMesaj.className = "";
        formMesaj.innerHTML = "";
    }
}