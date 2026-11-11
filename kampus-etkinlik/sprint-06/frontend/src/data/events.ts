import type { CampusEvent } from "../types/campus-events.ts";

export const events: CampusEvent[] = [
    {
        id: "event-1",
        title: "Kariyer Günleri 2026",
        category: "Seminer",
        date: "12-10-2026",
        time: "14:00",
        location: "A Blok Konferans Salonu",
        description: "Mezunlarla söyleşiler ve sektör deneyimleri aktarımı.",
        capacity: 120,
        image: "event1.png"
    },
    {
        id: "event-2",
        title: "Yapay Zeka & Gelecek Atölyesi",
        category: "Atölye",
        date: "15-10-2026",
        time: "10:30",
        location: "Laboratuvar B-2",
        description: "Büyük dil modelleri ve uygulama geliştirme üzerine pratik çalışma.",
        capacity: 30,
        image: "event2.png"
    },
    {
        id: "event-3",
        title: "Güz Dönemi Hoş Geldin Konseri",
        category: "Konser",
        date: "20-10-2026",
        time: "19:00",
        location: "Kampüs Açık Hava Sahnesi",
        description: "Öğrenci kulüplerinin müzik performansları ve ana sahne konseri.",
        capacity: 500,
        image: "event3.png"
    },
    {
        id: "event-4",
        title: "Sürdürülebilir Kampüs Söyleşisi",
        category: "Söyleşi",
        date: "25-10-2026",
        time: "13:30",
        location: "C Blok Amfi 1",
        description: "Yeşil enerji ve sıfır atık projelerinin değerlendirilmesi.",
        capacity: 80,
        image: "event4.png"
    },
    {
        id: "event-5",
        title: "Girişimcilik ve İnovasyon Zirvesi",
        category: "Söyleşi",
        date: "02-11-2026",
        time: "09:30",
        location: "Ana Kongre Merkezi",
        description: "Start-up kurucuları ve yatırımcılarla buluşma fırsatı.",
        capacity: 250,
        image: "event5.png" 
    },
    {
        id: "event-6",
        title: "Klasik Film Gösterimi: Metropolis",
        category: "Seminer",
        date: "08-11-2026",
        time: "18:00",
        location: "Öğrenci Merkezi Sinema Salonu",
        description: "Sinema kulübü katkılarıyla film gösterimi ve ardından söyleşi.",
        capacity: 60,
        image: "event6.png"
    }
];