import React from 'react';

export const GoogleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    <path d="M1 1h22v22H1z" fill="none"/>
  </svg>
);

export const AppleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.22 7.76c-.33-2.53-2.05-4.27-4.13-4.31-.04 0-1.6.04-2.99.04-1.39 0-2.95-.04-2.99-.04C7.05 3.49 5.33 5.23 5 7.76c-2.75.22-4.01 2.25-4.01 4.24 0 1.08.21 2.33 1.19 3.36.98 1.03 2.13 1.68 3.48 1.68.02 0 .04 0 .06 0 .13 0 .26-.01.38-.02.08.01.15.02.23.02.88 0 1.7-.31 2.52-.96.78.63 1.62.95 2.5.95.02 0 .03 0 .05 0 .87 0 1.71-.32 2.49-.95.79.65 1.64.96 2.52.96.08 0 .15-.01.23-.02.12.01.25.02.38.02.02 0 .04 0 .06 0 1.35 0 2.5-.65 3.48-1.68.98-1.03 1.19-2.28 1.19-3.36 0-1.99-1.26-4.02-4.01-4.24zm-7.23 9.04c-.04.07-.09.13-.14.19-.6.61-1.31.95-2.11.95-.82 0-1.54-.34-2.17-.98-.02-.02-.03-.04-.05-.06-.05-.05-.1-.1-.15-.15-.08-.09-.16-.18-.23-.28-.36-.51-.58-1.12-.58-1.78 0-.09.01-.18.02-.27.01-.08.02-.16.04-.23.04-.18.1-.35.17-.52.2-.48.49-.92.87-1.29.32-.31.62-.52.91-.65.13-.06.27-.11.4-.15.21-.06.43-.1.66-.1.8 0 1.52.34 2.12.94.04.04.08.08.12.13l.11.11c.09.1.18.2.26.31.37.52.59 1.13.59 1.79 0 .09-.01.18-.02.27-.01.08-.02.16-.04.23-.03.18-.09.35-.16.52-.21.48-.5.92-.88 1.29-.12.11-.24.22-.37.32zM14.95 5.01c.58-.63 1.01-1.41.95-2.28-.01-.08-.01-.15-.02-.23-.02-.14-.05-.28-.09-.41-.03-.1-.07-.19-.11-.28-.05-.09-.1-.18-.16-.26-.4-.57-1.01-.98-1.73-.98-.59 0-1.16.29-1.58.76-.39-.49-1-.79-1.64-.79-.69 0-1.29.38-1.69.91-.09.11-.18.23-.25.36-.04.06-.07.13-.1.19-.03.06-.05.12-.07.18-.03.08-.05.17-.07.25-.02.09-.03.18-.04.27-.01.09-.01.18-.01.28 0 .8.36 1.54.92 2.18.52.59 1.25.91 2 .91.76-.01 1.5-.33 2.04-.93z"/>
  </svg>
);

export const UserCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const LogoutIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

export const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export const YouTubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export const GlobeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

export const MailIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
  </svg>
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);


export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const XCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const HeartIcon: React.FC<{ className?: string }> = ({ className }) => ( // Filled Heart
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

export const HeartOutlineIcon: React.FC<{ className?: string }> = ({ className }) => ( // Outline Heart
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

export const MapPinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export const GlobeAsiaAustraliaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.795V6.75a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6.75v10.5A2.25 2.25 0 005.25 19.5h7.045M16.5 10.5h.008v.008h-.008V10.5zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008V16.5zm-3 0h.008v.008h-.008V16.5zm-3 0h.008v.008H10.5v-.008zm-3 0h.008v.008H7.5V16.5zm0-3h.008v.008H7.5v-.008zm0-3h.008v.008H7.5V10.5zm3 0h.008v.008h-.008V10.5zm3 3h.008v.008h-.008v-.008zm3-3h.008v.008h-.008V10.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.795c-.21.147-.435.274-.67.382M12 12.75a4.5 4.5 0 110-9 4.5 4.5 0 010 9z" />
  </svg>
);

export const CheckSquareIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0zM4 4h16v16H4V4z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
 </svg>
);

export const SquareIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4V4z" />
  </svg>
);

export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M19 3v4M17 5h4M14 10l-2.5 2.5L10 10M10 14l2.5-2.5L14 14M5 19v-4M3 17h4M19 19v-4M17 17h4M10 21l2.5-2.5L14 21M14 17l-2.5 2.5L10 17" />
  </svg>
);

export const ClipboardListIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

export const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

export const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export const MinusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
  </svg>
);

export const BookOpenIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

// --- Icons for Car Types Guide ---
// Generic Car Silhouettes (placeholders, replace with better SVGs if available)
export const SedanIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M59.4 38.2c-.4-.8-1.2-1.2-2-1.2H47l-4.4-12.2c-.4-.9-1.3-1.6-2.3-1.6h-19c-1 0-1.9.6-2.3 1.6L14.8 37H6.6c-.8 0-1.6.4-2 1.2-.4.8-.4 1.8 0 2.6l3.1 6c.4.8 1.2 1.2 2 1.2h4.8c-1.7 2.6-2.7 5.6-2.7 8.8 0 1.1.9 2 2 2s2-.9 2-2c0-4.9 4-8.8 8.8-8.8s8.8 4 8.8 8.8c0 1.1.9 2 2 2s2-.9 2-2c0-3.2-1-6.2-2.7-8.8h11.7c-1.7 2.6-2.7 5.6-2.7 8.8 0 1.1.9 2 2 2s2-.9 2-2c0-4.9 4-8.8 8.8-8.8s8.8 4 8.8 8.8c0 1.1.9 2 2 2s2-.9 2-2c0-3.2-1-6.2-2.7-8.8h4.8c.8 0 1.6-.4 2-1.2l3.1-6c.5-.8.5-1.8.1-2.6zm-40-20.4c0-.4.4-.8.8-.8h19c.4 0 .8.4.8.8v.4c0 .4-.4.8-.8.8h-19c-.4 0-.8-.4-.8-.8v-.4zM11.8 46l-2.3-4.5h7.8l2.3 4.5H11.8zm40.4 0H40.4l2.3-4.5h7.8L52.2 46z"></path></svg>
);
export const SuvIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M60 36.5H47.2l-3.5-9.8a2.5 2.5 0 00-2.3-1.7H22.6a2.5 2.5 0 00-2.3 1.7L16.8 36.5H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h4.9c-1.2 2.4-1.9 5.1-1.9 7.9 0 1.1.9 2 2 2s2-.9 2-2c0-4.4 3.6-8 8-8s8 3.6 8 8c0 1.1.9 2 2 2s2-.9 2-2c0-2.9-.7-5.5-1.9-7.9H43c-1.2 2.4-1.9 5.1-1.9 7.9 0 1.1.9 2 2 2s2-.9 2-2c0-4.4 3.6-8 8-8s8 3.6 8 8c0 1.1.9 2 2 2s2-.9 2-2c0-2.9-.7-5.5-1.9-7.9H60c1.1 0 2-.9 2-2v-10c0-1.1-.9-2-2-2zM21.5 27.5h21L45 36.5H19L21.5 27.5zM9 48.5H5v-8h4v8zm46 0h-4v-8h4v8z"></path></svg>
);
export const HatchbackIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
 <svg className={className} viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M59.2 37H49l-3.6-10c-.5-1.2-1.6-2-2.9-2H21.5c-1.3 0-2.4.8-2.9 2L15 37H4.8c-1 0-1.8.6-2.2 1.5s-.2 2 .6 2.7l4.9 5.6h4.1c-1.6 2.5-2.5 5.4-2.5 8.5 0 1.1.9 2 2 2s2-.9 2-2c0-4.6 3.7-8.3 8.3-8.3s8.3 3.7 8.3 8.3c0 1.1.9 2 2 2s2-.9 2-2c0-3.1-.9-6-2.5-8.5h10.8c-1.6 2.5-2.5 5.4-2.5 8.5 0 1.1.9 2 2 2s2-.9 2-2c0-4.6 3.7-8.3 8.3-8.3s8.3 3.7 8.3 8.3c0 1.1.9 2 2 2s2-.9 2-2c0-3.1-.9-6-2.5-8.5h4.1l4.9-5.6c.8-.8 1-1.9.6-2.7s-1.2-1.5-2.2-1.5zM20.2 27h23.6l2.7 7.5H17.5L20.2 27zM9.7 45.3l-3.5-4h5.6l3.5 4H9.7zm44.6 0h-5.6l3.5-4h5.6l-3.5 4z"></path></svg>
);
export const TruckIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
 <svg className={className} viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M60 35H46V23c0-1.1-.9-2-2-2H10c-1.1 0-2 .9-2 2v24H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h4.9c-1.2 2.4-1.9 5.1-1.9 7.9 0 1.1.9 2 2 2s2-.9 2-2c0-4.4 3.6-8 8-8s8 3.6 8 8c0 1.1.9 2 2 2s2-.9 2-2c0-2.9-.7-5.5-1.9-7.9h10.1c-1.2 2.4-1.9 5.1-1.9 7.9 0 1.1.9 2 2 2s2-.9 2-2c0-4.4 3.6-8 8-8s8 3.6 8 8c0 1.1.9 2 2 2s2-.9 2-2c0-2.9-.7-5.5-1.9-7.9H60c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zM10 45V23h34v12H30c-1.1 0-2 .9-2 2v8H10zm45 4h-4v-2h4v2z"></path></svg>
);

// Benefit/Consideration Icons (HeroIcons or similar)
export const VolumeOffIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
  </svg>
);
export const VolumeUpIcon: React.FC<{ className?: string }> = ({ className }) => (
 <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" > <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /> </svg>
);
export const UserGroupIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-3.741-1.5a3 3 0 00-3.741 1.5M15 11.25a3 3 0 11-6 0 3 3 0 016 0zm-3.75 3.75a3 3 0 00-3.75 3.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
export const FuelIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.03 1.123 0 1.131.094 1.976 1.057 1.976 2.192V7.5M8.25 7.5h7.5M8.25 7.5V9M15.75 7.5V9M8.25 12H12m0 0V9M12 12H15.75M12 12V15M5.625 15H18.375m-12.75 0V18c0 .414.336.75.75.75h11.25c.414 0 .75-.336.75-.75V15M5.625 15C4.947 15 4.5 14.553 4.5 13.875V12.75c0-.69.552-1.25 1.25-1.25H6.75" />
  </svg>
);
export const RoadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125H9z" />
  </svg>
);
export const ArchiveBoxXMarkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25A4.502 4.502 0 0016.5 6H7.5a4.502 4.502 0 00-4.5 2.25M21 8.25v8.695A2.25 2.25 0 0118.75 19.5H5.25A2.25 2.25 0 013 16.945V8.25M15.75 12L12 15.75m0 0L8.25 12M12 15.75V8.25" />
  </svg>
);
export const ArchiveBoxIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25A4.502 4.502 0 0016.5 6H7.5a4.502 4.502 0 00-4.5 2.25M21 8.25v8.695A2.25 2.25 0 0118.75 19.5H5.25A2.25 2.25 0 013 16.945V8.25" />
  </svg>
);
export const ArchiveBoxArrowDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25A4.502 4.502 0 0016.5 6H7.5a4.502 4.502 0 00-4.5 2.25M21 8.25v8.695A2.25 2.25 0 0118.75 19.5H5.25A2.25 2.25 0 013 16.945V8.25M12 12.75V16.5m0 0l-2.25-2.25M12 16.5l2.25-2.25" />
  </svg>
);
export const ArrowDownCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
export const CogIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15.045-4.122l-1.06-1.06M21.75 16.182l-1.06-1.06M16.182 3.25l-1.06 1.06M7.909 20.75l-1.06 1.06M12 18a6 6 0 100-12 6 6 0 000 12z" />
  </svg>
);
export const MapIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503-6.998l4.875-2.437a.38.38 0 01.497.31v11.365a.375.375 0 01-.57.308l-4.875-2.437M3.375 6.75c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-11.25c0-.621-.504-1.125-1.125-1.125H3.375z" />
  </svg>
);
export const ArrowsPointingOutIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75v4.5m0-4.5h-4.5m4.5 0L15 9M20.25 20.25v-4.5m0 4.5h-4.5m4.5 0L15 15" />
  </svg>
);
export const ArrowsPointingInIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9L3.75 3.75M3.75 3.75h4.5V8.25M9 9L3.75 3.75M3.75 3.75V8.25m4.5-4.5H3.75m0 0L9 9m11.25-5.25L15 9m4.5-4.5h-4.5V8.25M15 9l4.5-4.5m-4.5 4.5v-4.5m0 4.5H15m5.25 11.25l-4.5-4.5m4.5 4.5H15v-4.5m4.5 4.5l-4.5-4.5m-4.5 4.5L3.75 15m-4.5 4.5V15h4.5m4.5 4.5l-4.5-4.5" />
  </svg>
);
export const QuestionMarkCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </svg>
);
export const CubeTransparentIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v6M21 7.5L15.75 4.5M3 7.5l2.25-1.313M3 7.5v6M3 7.5l5.25-3M15.75 4.5l5.25 3m0 0l-5.25 3m5.25-3v6l-5.25 3M3.75 16.5L9 13.5m0 0L15 16.5m-6-3V21m6-7.5L21 16.5M7.5 21l4.5-3 4.5 3M3.75 21L9 18l6 3" />
  </svg>
);
export const LinkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
);
export const WrenchScrewdriverIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M11.42 15.17l2.496-3.03c.528-1.036.246-2.394-.84-3.232S8.076 7.229 7.29 8.265L4.5 11.42m5.83-3.595l1.065-1.065M13.5 12l1.065-1.065M4.5 11.42l1.065-1.065" />
  </svg>
);

export const CameraIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const CarKeyIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
  </svg>
);

export const ExclamationTriangleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

export const ChatBubbleLeftEllipsisIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-3.862 8.25-8.625 8.25S3.75 16.556 3.75 12 7.612 3.75 12.375 3.75 21 7.444 21 12z" />
  </svg>
);

export const CurrencyDollarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);