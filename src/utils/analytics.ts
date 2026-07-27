export interface AnalyticsEvent {
  id: string;
  timestamp: string; // ISO string
  formattedTime: string; // "27.07.2026, 13:45:10"
  action: string; // "Визит", "Просмотр", "Скачивание", "Поиск", "Отзыв"
  details: string; // "Скачан Tab Booster & Dark Mode Pro (ZIP)"
  device: string; // "Chrome / Windows PC"
  location: string; // "Россия / Москва (Сессия #8491)"
  ipApprox: string; // "178.62.***.***"
}

// Generate an anonymous session ID for this browser tab/session
const getSessionId = (): string => {
  try {
    let sid = sessionStorage.getItem('kp_session_id');
    if (!sid) {
      sid = Math.floor(1000 + Math.random() * 9000).toString();
      sessionStorage.setItem('kp_session_id', sid);
    }
    return sid;
  } catch {
    return '1001';
  }
};

// Detect browser device platform info
const getDeviceInfo = (): string => {
  if (typeof navigator === 'undefined') return 'Неизвестное устройство';
  const ua = navigator.userAgent;
  let os = 'ПК (Windows/Linux)';
  if (/android/i.test(ua)) os = 'Android Смартфон';
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS Устройство';
  else if (/mac/i.test(ua)) os = 'macOS';

  let browser = 'Браузер';
  if (/chrome|crios/i.test(ua)) browser = 'Chrome/Chromium';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';

  return `${browser} • ${os}`;
};

// Detect user location/IP approx simulation
const getLocationInfo = (): string => {
  const sid = getSessionId();
  if (typeof navigator !== 'undefined' && navigator.language) {
    const lang = navigator.language;
    if (lang.startsWith('ru')) {
      return `Россия / СНГ (Сессия #${sid})`;
    }
  }
  return `Европа / Global (Сессия #${sid})`;
};

const getIpApprox = (): string => {
  const sid = parseInt(getSessionId(), 10);
  const octet3 = (sid * 7) % 250;
  const octet4 = (sid * 13) % 250;
  return `178.${octet3}.${octet4}.***`;
};

// Get all events from localStorage
export const getAnalyticsEvents = (): AnalyticsEvent[] => {
  try {
    const saved = localStorage.getItem('kronas_analytics_events_v1');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Error loading analytics events', e);
  }
  
  // Default mock initial events if empty so admin sees live examples immediately
  return [
    {
      id: 'ev-101',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      formattedTime: new Date(Date.now() - 1000 * 60 * 5).toLocaleString('ru-RU'),
      action: 'Скачивание',
      details: 'Проект: Tab Booster & Dark Mode Pro (ZIP/CRX)',
      device: 'Chrome/Chromium • ПК (Windows/Linux)',
      location: 'Россия / Москва (Сессия #4829)',
      ipApprox: '178.62.14.***'
    },
    {
      id: 'ev-102',
      timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
      formattedTime: new Date(Date.now() - 1000 * 60 * 18).toLocaleString('ru-RU'),
      action: 'Просмотр',
      details: 'Карточка проекта: Cyber Exodus 2099',
      device: 'Chrome/Chromium • Android Смартфон',
      location: 'Россия / Санкт-Петербург (Сессия #3921)',
      ipApprox: '185.22.91.***'
    },
    {
      id: 'ev-103',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      formattedTime: new Date(Date.now() - 1000 * 60 * 45).toLocaleString('ru-RU'),
      action: 'Поиск',
      details: 'Поисковый запрос: "расширение тёмная тема"',
      device: 'Yandex/Chromium • ПК (Windows)',
      location: 'Казахстан / Алматы (Сессия #1102)',
      ipApprox: '95.58.201.***'
    },
    {
      id: 'ev-104',
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      formattedTime: new Date(Date.now() - 1000 * 60 * 120).toLocaleString('ru-RU'),
      action: 'Визит',
      details: 'Вход на сайт Kronas Play через Поиск Яндекса',
      device: 'Chrome/Chromium • ПК (Windows)',
      location: 'Россия / Екатеринбург (Сессия #8491)',
      ipApprox: '82.145.220.***'
    }
  ];
};

// Log a new analytics event
export const trackEvent = (action: string, details: string) => {
  try {
    const existing = getAnalyticsEvents();
    const newEv: AnalyticsEvent = {
      id: `ev-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      formattedTime: new Date().toLocaleString('ru-RU'),
      action,
      details,
      device: getDeviceInfo(),
      location: getLocationInfo(),
      ipApprox: getIpApprox()
    };

    // Keep last 300 events
    const updated = [newEv, ...existing].slice(0, 300);
    localStorage.setItem('kronas_analytics_events_v1', JSON.stringify(updated));
  } catch (e) {
    console.error('Error logging analytics event', e);
  }
};

// Clear all analytics data
export const clearAnalyticsEvents = () => {
  try {
    localStorage.removeItem('kronas_analytics_events_v1');
  } catch (e) {
    console.error('Error clearing analytics', e);
  }
};
