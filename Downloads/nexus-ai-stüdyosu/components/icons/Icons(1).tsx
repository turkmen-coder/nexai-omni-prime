
import React from 'react';

type IconProps = { className?: string; 'aria-hidden'?: boolean };

export const HomeIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.5 1.5 0 012.122 0l8.954 8.955M2.25 12l8.954 8.955a1.5 1.5 0 002.122 0l8.954-8.955M2.25 12h19.5" />
  </svg>
);

export const PencilSquareIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);

export const ChatBubbleLeftRightIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72-3.72a1.5 1.5 0 00-2.122 0l-3.72 3.72a2.123 2.123 0 01-3.004 0 2.123 2.123 0 010-3.004l3.72-3.72a1.5 1.5 0 000-2.122l-3.72-3.72a2.123 2.123 0 010-3.004 2.123 2.123 0 013.004 0l3.72 3.72a1.5 1.5 0 002.122 0l3.72-3.72c.884-.284 1.833.064 2.298.884z" />
  </svg>
);

export const Cog6ToothIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-.962a8.977 8.977 0 015.7 4.045 8.977 8.977 0 01-4.045 5.7.962.962 0 01-.962-1.11 7.469 7.469 0 00-5.7-4.045 7.469 7.469 0 004.045-5.7zM14.406 14.06c.09.542.56 1.007 1.11.962a8.977 8.977 0 015.7 4.045 8.977 8.977 0 01-4.045 5.7.962.962 0 01-.962-1.11 7.469 7.469 0 00-5.7-4.045 7.469 7.469 0 004.045-5.7z" />
  </svg>
);

export const ClipboardIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 01-2.25 2.25h-1.5a2.25 2.25 0 01-2.25-2.25V4.5A2.25 2.25 0 019 2.25h1.5m-3 4.5V18a2.25 2.25 0 002.25 2.25h6.75a2.25 2.25 0 002.25-2.25V6.75m-9 0h9" />
    </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
);