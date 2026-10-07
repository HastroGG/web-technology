import { events } from "./data.js";

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

const container = document.querySelector("#detay");

if (container) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const event = events.find(e => e.id === id);

    if (!event) {
        document.title = "Etkinlik Bulunamadı";
        container.innerHTML = `
            <div class="hata-kutusu">
                <h2>Etkinlik Bulunamadı</h2>
                <p>Aradığınız etkinlik mevcut değil veya kaldırılmış olabilir.</p>
                <a href="etkinlikler.html">Etkinlik Listesine Dön</a>
            </div>
        `;
    } else {
        document.title = `${event.title} - Etkinlik Detayı`;
        const formattedDate = formatDate(event.date);

        // assets/event1.png mantığı
        const gorselAdi = event.id.replace("-", ""); 
        const resimYolu = `assets/${gorselAdi}.png`;

        container.innerHTML = `
            <article class="etkinlik-detay-karti" style="max-width: 900px; margin: 0 auto; padding: 20px;">
                
                <!-- ÜST KISIM: AFİŞ (SOLDA) VE KÜNYE (SAĞDA) -->
                <div style="display: flex; gap: 30px; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; margin-bottom: 30px;">
                    
                    <!-- SOL: AFİŞ VE ALTYAZISI -->
                    <div style="flex: 1; min-width: 300px; max-width: 480px;">
                        <img src="${resimYolu}" alt="${event.title}" style="width: 100%; height: auto; border-radius: 6px; border: 2px solid #1e293b; display: block;" />
                        <span style="display: block; font-style: italic; color: #64748b; font-size: 0.85rem; margin-top: 6px;">${event.title} afişi</span>
                    </div>

                    <!-- SAĞ: ETKİNLİK KÜNYESİ KARTIK -->
                    <div style="flex: 1; min-width: 280px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
                        <h3 style="margin-top: 0; font-size: 1.25rem; color: #1e293b; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; margin-bottom: 15px;">Etkinlik Künyesi</h3>
                        
                        <dl class="kunye" style="margin: 0; display: grid; grid-template-columns: 100px 1fr; row-gap: 12px; font-size: 0.95rem;">
                            <dt style="font-weight: 600; color: #334155;">Tarih</dt>
                            <dd style="margin: 0; color: #475569;"><time datetime="${event.date}">${formattedDate}, ${event.time}</time></dd>

                            <dt style="font-weight: 600; color: #334155;">Yer</dt>
                            <dd style="margin: 0; color: #475569;">${event.location}</dd>

                            <dt style="font-weight: 600; color: #334155;">Kategori</dt>
                            <dd style="margin: 0; color: #475569;">${event.category}</dd>

                            <dt style="font-weight: 600; color: #334155;">Kontenjan</dt>
                            <dd style="margin: 0; color: #475569;">${event.capacity} kişi</dd>
                        </dl>
                    </div>

                </div>

                <!-- ALT KISIM: AÇIKLAMA -->
                <div style="margin-bottom: 25px;">
                    <h3 style="font-size: 1.4rem; color: #1e293b; margin-bottom: 10px;">Açıklama</h3>
                    <p style="color: #475569; line-height: 1.6; font-size: 1rem; margin: 0;">${event.description ? event.description : "Açıklama bulunmuyor."}</p>
                </div>

                <!-- ALT KISIM: YEŞİL BUTONLAR -->
                <div style="display: flex; gap: 15px; align-items: center; margin-top: 20px;">
                    <a href="etkinlikler.html" style="display: inline-block; padding: 10px 22px; background-color: #15803d; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 0.95rem; transition: background-color 0.2s;">← Listeye dön</a>
                    <a href="etkinlik-guncelle.html?id=${event.id}" style="display: inline-block; padding: 10px 22px; background-color: #15803d; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 0.95rem; transition: background-color 0.2s;">Bu etkinliği güncelle</a>
                </div>

            </article>
        `;
    }
}