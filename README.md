# Kampüs Etkinlikleri (React & TypeScript)

Üniversite içerisindeki akademik, kültürel ve sosyal etkinliklerin takip edilmesini, filtrelenmesini ve yönetilmesini sağlayan modern bir **React** ve **TypeScript** web uygulamasıdır. Proje, Vite ve React Router altyapısıyla geliştirilmiştir.

## 🚀 Canlı Önizleme (Vercel)
* **Canlı Vercel Adresi:** https://ramazanharunergene-frontend.vercel.app/

## Özellikler

- **10 Rota Mimarisi:** Ana sayfa, etkinlik listesi, etkinlik detayları, kullanıcı giriş/kayıt sayfaları ve yönetim paneli arasında sorunsuz geçiş.
- **Dinamik Etkinlik Yönetimi:** Context API (`EventsContext`) kullanılarak etkinlik ekleme, güncelleme ve silme işlemleri.
- **Gelişmiş Filtreleme:** Etkinlikleri kategoriye ve anahtar kelimeye göre anlık filtreleme.
- **Responsive Tasarım ve Tema:** Özel CSS değişkenleri (`--renk-ana`) ve merkezi `App.css` ile tam renk uyumu.
- **Form Validasyonları:** Kullanıcı dostu hata yönetimli giriş, kayıt ve etkinlik formları.

## Proje Yapısı

```text
kampus-etkinlik-react/
├── public/                 # Statik görseller (event1.png, vb.)
├── src/
│   ├── components/         # Yeniden kullanılabilir bileşenler (Events, Forms vb.)
│   ├── context/            # Global state yönetimi (EventsContext)
│   ├── pages/              # Sayfa bileşenleri (Home, Events, Admin, Login vb.)
│   ├── types/              # TypeScript tip tanımlamaları
│   ├── App.tsx             # Ana uygulama ve router yönlendirmeleri
│   └── App.css             # Merkezi stil ve tema dosyası
```

## Kullanılan Teknolojiler

- **React 18** & **TypeScript**
- **Vite** (Hızlı derleme ve geliştirme ortamı)
- **React Router DOM** (İstemci tarafı sayfa yönlendirmesi)
- **CSS3** (Özel değişkenler ve modern flexbox/grid layout yapıları)

## ⚙️ Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için terminal üzerinde aşağıdaki adımları sırasıyla uygulayabilirsiniz:

1. Projeyi bilgisayarınıza klonlayın veya indirin.
2. Proje dizininde bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```
4. Tarayıcınızda `http://localhost:5173` adresine giderek uygulamayı görüntüleyin.

## 🗺️ Route Listesi

Uygulama içerisinde tanımlı olan 10 rota yapısı:

| Rota (Path) | Sayfa / Bileşen | Açıklama |
| --- | --- | --- |
| `/` | `HomePage` | Öne çıkan etkinlikleri ve karşılama alanını gösterir. |
| `/events` | `EventsPage` | Tüm kampüs etkinliklerini listeler, arama ve kategori filtresi sunar. |
| `/events/:id` | `EventDetailPage` | Seçilen etkinliğin detaylarını, konumunu ve kontenjanını gösterir. |
| `/login` | `LoginPage` | Kullanıcı giriş yapma ekranı. |
| `/register` | `RegisterPage` | Yeni kullanıcı kayıt olma ekranı. |
| `/forgot-password` | `ForgotPasswordPage` | Şifre yenileme talep sayfası. |
| `/admin` | `AdminPage` | Etkinliklerin yönetildiği, silme ve düzenleme paneli. |
| `/admin/new` | `AddEventPage` | Yeni etkinlik ekleme formu. |
| `/admin/:id/edit` | `EditEventPage` | Mevcut etkinlik bilgilerini güncelleme formu. |
| `*` | `NotFoundPage` | Eşleşmeyen rotalar için 404 hata sayfası. |

## Geliştirici

Ramazan Harun Ergene  
Öğrenci No: 2416501030
