// Sadece seed için örnek veri (6 etkinlik, id alanı yok: MongoDB _id verir)
// Tarih biçimi "GG-AA-YYYY". 15-10-2026 ve 05-11-2026 geçmiş tarihlidir:
// /events/upcoming listesinde görünmezler.
export const seedEvents = [
  {
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    capacity: 120,
    date: "01-12-2026",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Mezunlarla söyleşiler ve sektör deneyimleri aktarımı.",
  },
  {
    title: "Robotik Atölyesi",
    category: "Atölye",
    capacity: 30,
    date: "15-10-2026", // geçmiş
    time: "10:30",
    location: "Laboratuvar B-2",
    description: "Temel robot kollarının programlanması üzerine uygulamalı çalışma.",
  },
  {
    title: "Siber Güvenlik Söyleşisi",
    category: "Söyleşi",
    capacity: 80,
    date: "08-12-2026",
    time: "13:30",
    location: "C Blok Amfi 1",
    description: "Güncel siber tehditler ve korunma yöntemleri.",
  },
  {
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    capacity: 40,
    date: "05-11-2026", // geçmiş
    time: "09:30",
    location: "Bilgisayar Laboratuvarı 1",
    description: "HTML, CSS ve duyarlı tasarım ile ilk web sayfanı yap.",
  },
  {
    title: "Kodlama Yarışması",
    category: "Yarışma",
    capacity: 100,
    date: "15-12-2026",
    time: "11:00",
    location: "Öğrenci Merkezi",
    description: "Takımlar halinde algoritma soruları çözülen yarışma.",
  },
  {
    title: "Yapay Zekâ Semineri",
    category: "Seminer",
    capacity: 250,
    date: "17-12-2026",
    time: "15:00",
    location: "Ana Kongre Merkezi",
    description: "Büyük dil modelleri ve uygulama alanları üzerine seminer.",
  },
];
