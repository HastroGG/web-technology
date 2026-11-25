# Kampüs Etkinlik API (backend)

## Çalıştırma
```bash
cd backend
npm install
cp .env.example .env   # Windows: copy .env.example .env
# .env içindeki MONGODB_URI'yi kendi Atlas adresinle değiştir (sonuna /kampus ekle)
npm run seed           # veritabanına 6 örnek etkinlik ekler (her çalışmada sıfırlar; 2 tanesi geçmiş tarihli)
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
| GET | /health | Sunucu durumu | 200 | — | çalışıyor |
| GET | /events | Liste (`?search=` başlıkta ara, `?category=` filtrele) | 200 | — | çalışıyor |
| GET | /events/upcoming | Bugün ve sonrası, tarihe göre sıralı | 200 | — | çalışıyor |
| GET | /events/:id | Tek etkinlik | 200 | 404 | çalışıyor |
| POST | /events | Yeni etkinlik | 201 | 400 | çalışıyor |
| PATCH | /events/:id | Sadece gönderilen alanları güncelle | 200 (güncel kayıt) | 400, 404 | çalışıyor |
| DELETE | /events/:id | Sil | 204 (gövde yok) | 404 | çalışıyor |

**Tarih biçimi:** her yerde `GG-AA-YYYY` (örn. `"15-10-2026"`). `2026-12-20` gibi biçimler 400 döner.
Geçersiz ya da olmayan id her yerde 404 döner.

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı

**Hata biçimi (hepsinde aynı):**
```json
{ "error": { "message": "Event not found" } }
```
Geçersiz biçimli id (`/events/yok`) de 404 döner. Beklenmeyen hata: 500 `Server error`.

**POST /events body örneği** (`title` en az 3 harf, `category` ["Seminer","Atölye","Söyleşi","Yarışma","Konser"], `date` zorunlu; kurallar Mongoose schema'sında):
```json
{ "title": "Git Atölyesi", "category": "Atölye", "date": "01-12-2026", "capacity": 30 }
```
