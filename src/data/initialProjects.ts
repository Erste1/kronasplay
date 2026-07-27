import { Project, DeveloperProfile } from '../types';
import logoImg from '../assets/images/kronas_play_logo_1785144789382.jpg';

export const initialDeveloperProfile: DeveloperProfile = {
  name: "Kronas Play",
  tagline: "Инди-студия игр и программного обеспечения для ПК (Windows) и Android",
  bio: "Создаю приложения на C#, Kotlin и C++, а также инди-игры на Unreal Engine и Unity.",
  avatarUrl: logoImg,
  telegramUsername: "@kronas_play",
  discordTag: "kronasplay",
  email: "kronas.play@example.com",
  youtubeUrl: "https://youtube.com",
  itchioUrl: "https://itch.io",
  skills: [
    "C# / .NET",
    "Unity 3D/2D",
    "Kotlin / Android SDK",
    "C++ / OpenGL",
    "Unreal Engine",
    "WPF / WinForms",
    "Flutter / Dart"
  ],
  footerText: "Все права защищены. Каталог игр и программного обеспечения Kronas Play.",
  heroTitle: "Разработка Игр и Приложений",
  heroSubtitle: "Официальный портал инди-студии Kronas Play. Бесплатное скачивание проверенных сборников EXE и APK без рекламы."
};

export const initialProjects: Project[] = [
  {
    id: "chrome-tab-booster",
    title: "Tab Booster & Dark Mode Pro",
    shortDescription: "Расширение для Chrome и Яндекс Браузера: оптимизация открытых вкладок и принудительный тёмный режим.",
    fullDescription: "Быстрое и легкое расширение для браузеров на базе Chromium (Google Chrome, Яндекс.Браузер, Opera, Microsoft Edge). Выгружает неактивные вкладки из оперативной памяти, экономит до 40% RAM и позволяет включать стильную тёмную тему на абсолютно любом сайте.",
    platform: "windows",
    type: "extension",
    version: "v1.2.0",
    releaseDate: "2026-02-18",
    rating: 5,
    downloadsCount: 12400,
    starsCount: 310,
    tags: ["Chrome", "Extension", "Browser", "JavaScript", "Dark Mode", "Utility"],
    bannerUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80"
    ],
    downloadUrlExe: "https://example.com/downloads/TabBooster_Extension.zip",
    featured: true,
    isNew: true,
    requirements: {
      os: "Chrome / Yandex Browser / Opera / Edge",
      storage: "5 MB"
    },
    changelog: [
      "v1.2.0 — Настройка горячих клавиш и пользовательский список исключений.",
      "v1.0.0 — Публичный релиз расширения."
    ]
  },
  {
    id: "cyber-exodus-2099",
    title: "Cyber Exodus 2099",
    shortDescription: "Динамичный 2D киберпанк платформер с элементами рогалика и кастомизацией оружия.",
    fullDescription: "Cyber Exodus 2099 — это футуристический экшен-платформер для ПК (Windows). Пробирайтесь через неоновые улицы и подпольные лаборатории мегаполиса Нова-Сити, сражаясь с ордами дроидов и боссов. В игре присутствуют процедурные уровни, прокачка персонажа и динамичная музыка.",
    platform: "windows",
    type: "game",
    version: "v1.4.2",
    releaseDate: "2025-11-10",
    rating: 5,
    downloadsCount: 18400,
    starsCount: 340,
    tags: ["Unity", "C#", "Action", "Cyberpunk", "2D Platformer"],
    bannerUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80"
    ],
    downloadUrlExe: "https://example.com/downloads/CyberExodus_Setup.exe",
    featured: true,
    isNew: false,
    requirements: {
      os: "Windows 10 / 11 (64-bit)",
      processor: "Intel Core i3-6100 / AMD Ryzen 3 1200",
      ram: "8 GB RAM",
      graphics: "NVIDIA GeForce GTX 750 Ti / AMD Radeon RX 550",
      storage: "2.5 GB свободного места"
    },
    changelog: [
      "v1.4.2 — Оптимизация производительности на слабых ПК, добавлены 2 новых босса.",
      "v1.3.0 — Поддержка геймпадов Xbox и DualSense, фикс багов с физикой.",
      "v1.0.0 — Полный релиз."
    ]
  },
  {
    id: "quick-optimizer-pc",
    title: "QuickOptimizer Pro PC",
    shortDescription: "Системная утилита для глубокой очистки, ускорения Windows и контроля автозагрузки.",
    fullDescription: "Мощное и легкое Windows-приложение для оптимизации операционной системы. Позволяет в один клик удалить кэш, очистить временные файлы, оптимизировать оперативную память, настроить автозагрузку программ и отключить неиспользуемые службы Windows.",
    platform: "windows",
    type: "app",
    version: "v2.1.0",
    releaseDate: "2026-01-15",
    rating: 5,
    downloadsCount: 32100,
    starsCount: 512,
    tags: ["C#", "WPF", ".NET 8", "Windows Utility", "Optimizer"],
    bannerUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80"
    ],
    downloadUrlExe: "https://example.com/downloads/QuickOptimizer_Portable.exe",
    featured: true,
    isNew: true,
    requirements: {
      os: "Windows 10 / 11",
      processor: "Любой x64 процессор",
      ram: "512 MB RAM",
      storage: "30 MB свободного места"
    },
    changelog: [
      "v2.1.0 — Добавлен темный интерфейс Fluent UI, утилита анализа дискового пространства.",
      "v2.0.0 — Переход на .NET 8, скорость работы выросла на 40%."
    ]
  },
  {
    id: "neon-dash-3d-android",
    title: "Neon Dash 3D",
    shortDescription: "Бесконечный неоновый аркадный раннер для Android с синтвейв саундтреком.",
    fullDescription: "Захватывающий мобильный 3D-раннер в жанре Synthwave. Управляйте неоновой кубической сферой, избегайте препятствий на бешеных скоростях, собирайте кристаллы и разблокируйте уникальные визуальные эффекты и скины.",
    platform: "android",
    type: "game",
    version: "v1.2.5",
    releaseDate: "2026-02-01",
    rating: 4,
    downloadsCount: 45000,
    starsCount: 280,
    tags: ["Unity", "Android", "Arcade", "Runner", "Synthwave"],
    bannerUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop&q=80"
    ],
    downloadUrlApk: "https://example.com/downloads/NeonDash3D.apk",
    featured: true,
    isNew: true,
    requirements: {
      androidVersion: "Android 8.0 (API 26) и выше",
      ram: "2 GB RAM",
      storage: "120 MB"
    },
    changelog: [
      "v1.2.5 — Добавлены 3 новых трека, таблица лидеров.",
      "v1.1.0 — Поддержка экранов 120 Гц."
    ]
  },
  {
    id: "battery-health-master",
    title: "Battery Health Master",
    shortDescription: "Мобильное приложение Android для точной диагностики батареи, износа и контроллера заряда.",
    fullDescription: "Battery Health Master — это профессиональный инструмент контроля состояния аккумулятора вашего смартфона. Отслеживает скорость зарядки/разрядки в миллиамперах (mA), вычисляет реальную емкость батареи в mAh, температуру и отправляет уведомления о полном заряде.",
    platform: "android",
    type: "app",
    version: "v3.0.1",
    releaseDate: "2025-10-20",
    rating: 5,
    downloadsCount: 62000,
    starsCount: 890,
    tags: ["Kotlin", "Android SDK", "Jetpack Compose", "Utility", "System"],
    bannerUrl: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80"
    ],
    downloadUrlApk: "https://example.com/downloads/BatteryMaster_v3.0.1.apk",
    featured: false,
    isNew: false,
    requirements: {
      androidVersion: "Android 9.0 и выше",
      ram: "1 GB RAM",
      storage: "15 MB"
    },
    changelog: [
      "v3.0.1 — Обновлен интерфейс Material 3 (Dynamic Colors), улучшена точность датчиков на устройствах Xiaomi и Samsung."
    ]
  },
  {
    id: "shadow-dungeon-roguelike",
    title: "Shadow Dungeon Roguelike",
    shortDescription: "Хардкорный пиксельный пошаговый рогалик для Windows с прокачкой и артефактами.",
    fullDescription: "Исследуйте бесконечные процедурно генерируемые подземелья, находите редкие магические свитки и артефакты, сражайтесь с монстрами и создайте непобедимую сборку героя. Игра разработана на C++ и Raylib с упором на плавный геймплей и ретро-стилистику.",
    platform: "windows",
    type: "game",
    version: "v1.0.4",
    releaseDate: "2025-08-12",
    rating: 5,
    downloadsCount: 12300,
    starsCount: 210,
    tags: ["C++", "Raylib", "Roguelike", "Pixel Art", "RPG"],
    bannerUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80"
    ],
    downloadUrlExe: "https://example.com/downloads/ShadowDungeon_Win.zip",
    featured: false,
    isNew: false,
    requirements: {
      os: "Windows 7 / 8 / 10 / 11",
      processor: "1.5 GHz Dual Core",
      ram: "2 GB RAM",
      storage: "100 MB"
    }
  },
  {
    id: "focus-studio-crossplatform",
    title: "Focus Studio: Pomodoro & Tasks",
    shortDescription: "Приложение для продуктивности с таймером Помодоро и звуками природы для Windows и Android.",
    fullDescription: "Минималистичный менеджер задач и таймер фокусировки attention. Поддерживает синхронизацию задач, генератор фонового шума (дождь, костер, кофейня), гибкие интервалы и детальную статистику продуктивности.",
    platform: "both",
    type: "app",
    version: "v2.0.0",
    releaseDate: "2026-02-10",
    rating: 5,
    downloadsCount: 29400,
    starsCount: 430,
    tags: ["Flutter", "Dart", "Productivity", "Cross-Platform", "Pomodoro"],
    bannerUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=80"
    ],
    downloadUrlExe: "https://example.com/downloads/FocusStudio_Windows.exe",
    downloadUrlApk: "https://example.com/downloads/FocusStudio_Android.apk",
    featured: true,
    isNew: true,
    requirements: {
      os: "Windows 10+ / Android 7.0+",
      ram: "2 GB RAM",
      storage: "60 MB"
    }
  },
  {
    id: "retro-tank-battles-android",
    title: "Retro Tank 1990 Reborn",
    shortDescription: "Ремейк классических танчиков для Android с мультиплеером по Wi-Fi.",
    fullDescription: "Nostalgic 2D tank battle game for Android. Защищайте штаб, подбирайте бонусы, сражайтесь против друзей по локальной сети Wi-Fi или проходите 50+ авторских карт.",
    platform: "android",
    type: "game",
    version: "v1.1.2",
    releaseDate: "2025-09-05",
    rating: 4,
    downloadsCount: 38000,
    starsCount: 195,
    tags: ["Kotlin", "Canvas", "Multiplayer", "Arcade", "Retro"],
    bannerUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop&q=80"
    ],
    downloadUrlApk: "https://example.com/downloads/RetroTanks.apk",
    featured: false,
    isNew: false,
    requirements: {
      androidVersion: "Android 6.0 и выше",
      ram: "1 GB RAM",
      storage: "40 MB"
    }
  },
  {
    id: "dev-code-snippets-vault",
    title: "CodeSnippets Vault PC",
    shortDescription: "Быстрый менеджер кодовых фрагментов с подсветкой синтаксиса и поиском для разработчиков.",
    fullDescription: "Удобный локальный органайзер кода для Windows. Поддерживает 30+ языков программирования, мгновенный поиск, тегирование, экспорт в Markdown и горячие клавиши для быстрой вставки кодовых блоков.",
    platform: "windows",
    type: "app",
    version: "v1.5.0",
    releaseDate: "2025-12-01",
    rating: 5,
    downloadsCount: 15600,
    starsCount: 310,
    tags: ["C#", "WPF", "Developer Tool", "Windows", "Utility"],
    bannerUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80"
    ],
    downloadUrlExe: "https://example.com/downloads/CodeVault_Setup.exe",
    featured: false,
    isNew: false,
    requirements: {
      os: "Windows 10 / 11",
      ram: "1 GB RAM",
      storage: "50 MB"
    }
  }
];
