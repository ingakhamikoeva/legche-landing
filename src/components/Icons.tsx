// Однотонные линейные пиктограммы для блока 5 (рисованы под бренд, не из наборов).
// Стиль: скруглённый штрих 1.8, один цвет (наследует currentColor).
type P = { className?: string };
const base = {
  viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round',
} as const;

export const IconLesson = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M12 5.5C10 4 7 3.5 4 4v14c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V4c-3-.5-6 0-8 1.5Z" />
    <path d="M12 5.5v14" />
  </svg>
);

export const IconPlate = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

export const IconChat = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M20 12a8 8 0 1 0-3.1 6.3L20 19.5l-.9-3A8 8 0 0 0 20 12Z" />
    <path d="M8.5 11h7M8.5 14h4.5" />
  </svg>
);

export const IconHeadphones = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <rect x="3.5" y="13.5" width="4" height="6" rx="2" />
    <rect x="16.5" y="13.5" width="4" height="6" rx="2" />
  </svg>
);

export const IconDiary = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <rect x="5" y="3.5" width="14" height="17" rx="2.5" />
    <path d="M9 3.5v17M12.5 8.5H16M12.5 12H16" />
  </svg>
);

export const IconShield = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M12 3.5 19 6v6c0 4.4-3 7.4-7 8.5-4-1.1-7-4.1-7-8.5V6l7-2.5Z" />
    <path d="m9 12 2.2 2.2L15.5 9.8" />
  </svg>
);

// Иконки соцсетей для подвала — тот же стиль (тонкий штрих, currentColor)
export const IconVk = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M4 8.5c.3 6 3.3 9.5 9 9.5h1v-3.3c2 .2 3.5 1.7 4.1 3.3H21c-.3-2.2-1.9-4-3.1-4.7 1.2-.8 2.5-2.2 2.8-4.3h-2.9c-.4 1.7-1.7 3-3.3 3.3V8.5H11.6v6.4C10 14.5 8.9 12.4 8.8 8.5H5.9c.1 0-.6 0-1.9 0Z" />
  </svg>
);

export const IconTelegram = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <path d="m20 5-2.6 13.4c-.2 1-1.4 1.3-2.1.6l-3.6-3-1.8 1.7c-.2.2-.5.3-.8.2l.3-3.6 6.6-6-8.3 4.6-3.4-1c-.8-.2-.8-1.3 0-1.6L19 4.4c.7-.3 1.3.2 1 1.1Z" />
  </svg>
);

export const IconYoutube = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <rect x="3" y="6.5" width="18" height="11" rx="3.5" />
    <path d="M10.5 9.8v4.4l4-2.2Z" fill="currentColor" stroke="none" />
  </svg>
);

export const IconInstagram = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <rect x="4" y="4" width="16" height="16" rx="5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="16.2" cy="7.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const IconMax = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <rect x="3.5" y="3.5" width="17" height="17" rx="6" />
    <path d="M13.3 9.3a3.3 3.3 0 1 1-2.9 4.9l-2.2.9.7-2.3a3.3 3.3 0 0 1 4.4-3.5Z" />
  </svg>
);
