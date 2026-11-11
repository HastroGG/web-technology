# Kampüs Etkinlik API (backend)

## Çalıştırma
```bash
cd backend
npm install
cp .env.example .env   # Windows: copy .env.example .env
npm run dev
```
Sunucu: http://localhost:3000

## Ortam değişkenleri
| Değişken | Açıklama | Varsayılan |
|----------|----------|------------|
| PORT | Sunucunun dinleyeceği port | 3000 |

## REST sözleşmesi
| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|--------|----------|------|----------|------|-------|
| GET | /health | Sunucu durumu | 200 | — | Bu sprint |
| GET | /events | Listeyi getir (`?category=` ile filtre) | 200 | — | Bu sprint |
| GET | /events/:id | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | /events | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | /events/:id | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | /events/:id | Sil | 204 | 404 | Sprint 9 |

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı

**Hata biçimi (hepsinde aynı):**
```json
{ "error": { "message": "Event not found" } }
```

**POST /events body örneği** (`title`, `category`, `date` zorunlu):
```json
{ "title": "Git Atölyesi", "category": "Atölye", "date": "2026-12-01", "capacity": 30 }
```
