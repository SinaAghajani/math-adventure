
export interface Game {
    id: string;
    title: string;
    description: string;
    icon: string;
    duration: number;
    difficulty: "آسان" | "متوسط" | "سخت";
}

export interface Chapter {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    icon: string;
    color: string;
    background: string;
    games: Game[];
    status: "available" | "locked";
    progress: number;
}

export const chapters: Chapter[] = [
    {
        id: 1,
        title: "عددنویسی و الگوها",
        subtitle: "سرزمین اعداد بزرگ",
        description: "به دنیای اعداد سفر کن، راز میلیاردها را کشف کن و الگوهای شگفت‌انگیز را پیدا کن.",
        icon: "🔢",
        color: "#6366F1",
        background: "#EEF2FF",
        status: "available",
        progress: 0,
        games: [
            {
                id: "number-factory",
                title: "کارخانه اعداد",
                description: "عددها را بساز و ارزش مکانی رقم‌ها را کشف کن.",
                icon: "🏭",
                duration: 5,
                difficulty: "آسان",
            },
            {
                id: "billion-treasure",
                title: "گنجینه میلیارد",
                description: "به سرزمین میلیاردها برو و رمز اعداد بزرگ را پیدا کن.",
                icon: "💎",
                duration: 7,
                difficulty: "متوسط",
            },
            {
                id: "time-market",
                title: "بازار زمان",
                description: "جمع و تفریق عددهای مرکب را در یک بازار عجیب تمرین کن.",
                icon: "⏳",
                duration: 6,
                difficulty: "متوسط",
            },
            {
                id: "pattern-detective",
                title: "کارآگاه الگوها",
                description: "الگوهای عددی را کشف کن و جای خالی را پیدا کن.",
                icon: "🔍",
                duration: 5,
                difficulty: "آسان",
            },
            {
                id: "number-guardian",
                title: "نگهبان اعداد",
                description: "در نبرد نهایی، مهارت‌های خود را به چالش بکش.",
                icon: "🐉",
                duration: 10,
                difficulty: "سخت",
            },
        ],
    },
    {
        id: 2,
        title: "کسر",
        subtitle: "جزیره کسرها",
        description: "به جزیره کسرها سفر کن و با جمع، تفریق، ضرب و تقسیم کسرها آشنا شو.",
        icon: "🍕",
        color: "#F59E0B",
        background: "#FFFBEB",
        status: "locked",
        progress: 0,
        games: [],
    },
    {
        id: 3,
        title: "نسبت، تناسب و درصد",
        subtitle: "شهر نسبت‌ها",
        description: "راز نسبت‌ها و درصدها را کشف کن و مسئله‌های چالش‌برانگیز را حل کن.",
        icon: "⚖️",
        color: "#10B981",
        background: "#ECFDF5",
        status: "locked",
        progress: 0,
        games: [],
    },
    {
        id: 4,
        title: "تقارن و چندضلعی‌ها",
        subtitle: "قصر اشکال هندسی",
        description: "وارد دنیای اشکال شو و راز تقارن، زاویه و چندضلعی‌ها را کشف کن.",
        icon: "🔷",
        color: "#EC4899",
        background: "#FDF2F8",
        status: "locked",
        progress: 0,
        games: [],
    },
    {
        id: 5,
        title: "عددهای اعشاری",
        subtitle: "سیاره اعشار",
        description: "در سیاره اعشار، با عددهای اعشاری و عملیات ریاضی آن‌ها آشنا شو.",
        icon: "🔬",
        color: "#06B6D4",
        background: "#ECFEFF",
        status: "locked",
        progress: 0,
        games: [],
    },
    {
        id: 6,
        title: "اندازه‌گیری",
        subtitle: "سرزمین اندازه‌ها",
        description: "مساحت، محیط، حجم و گنجایش را در مأموریت‌های مختلف یاد بگیر.",
        icon: "📏",
        color: "#8B5CF6",
        background: "#F5F3FF",
        status: "locked",
        progress: 0,
        games: [],
    },
    {
        id: 7,
        title: "آمار و احتمال",
        subtitle: "آزمایشگاه دانشمندان",
        description: "داده‌ها را بررسی کن، میانگین بگیر و احتمال اتفاق‌ها را کشف کن.",
        icon: "📊",
        color: "#EF4444",
        background: "#FEF2F2",
        status: "locked",
        progress: 0,
        games: [],
    },
];

export const getChapterById = (id: number) =>
    chapters.find((chapter) => chapter.id === id);

export const getGameById = (chapterId: number, gameId: string) =>
    getChapterById(chapterId)?.games.find((game) => game.id === gameId);
