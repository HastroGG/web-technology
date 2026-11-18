# Kampüs Etkinlik API (backend)

## Çalıştırma
```bash
cd backend
npm install
cp .env.example .env   # Windows: copy .env.example .env
# .env içindeki MONGODB_URI'yi kendi Atlas adresinle değiştir (sonuna /kampus ekle)
npm run seed           # veritabanına 6 örnek etkinlik ekler (her çalışmada sıfırlar)
npm run dev
```
Sunucu: http://localhost:3000

## Ortam değişkenleri
| Değişken | Açıklama | Varsayılan |
|----------|----------|------------|
| PORT | Sunucunun dinleyeceği port | 3000 |
| MONGODB_URI | MongoDB bağlantı adresi (gerçek adres sadece `.env`'de, repoya girmez) | — |

## REST sözleşmesi
| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|--------|----------|------|----------|------|-------|
| GET | /health | Sunucu durumu | 200 | — | Sprint 7 |
| GET | /events | Listeyi getir (`?category=` ile filtre) | 200 | — | Sprint 8: MongoDB |
| GET | /events/:id | Tek etkinlik | 200 | 404 | Sprint 8: MongoDB |
| POST | /events | Yeni etkinlik | 201 | 400 | Sprint 8: MongoDB |
| PATCH | /events/:id | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | /events/:id | Sil | 204 | 404 | Sprint 9 |

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı

**Hata biçimi (hepsinde aynı):**
```json
{ "error": { "message": "Event not found" } }
```
Geçersiz biçimli id (`/events/yok`) de 404 döner. Beklenmeyen hata: 500 `Server error`.

**POST /events body örneği** (`title` en az 3 harf, `category` ["Seminer","Atölye","Söyleşi","Yarışma","Konser"], `date` zorunlu; kurallar Mongoose schema'sında):
```json
{ "title": "Git Atölyesi", "category": "Atölye", "date": "2026-12-01", "capacity": 30 }
```
