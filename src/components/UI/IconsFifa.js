import React from "react";

const baseProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};

const gold = "#FACC15";
const dark = "#020617";

export function IconBall(props) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="10" fill={dark} stroke={gold} strokeWidth="2" />
      <polygon points="12,6 9,9 10,13 14,13 15,9" fill={gold} />
      <polygon points="7,11 9,9 10,13 8,15 6,13" fill={gold} opacity="0.7" />
      <polygon points="17,11 15,9 14,13 16,15 18,13" fill={gold} opacity="0.7" />
    </svg>
  );
}

export function IconTrophy(props) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="9" y="4" width="6" height="8" rx="1" fill={gold} />
      <path d="M9 8H6C6 6.5 6.5 5.5 7.5 5H9" stroke={gold} strokeWidth="1.5" />
      <path d="M15 8H18C18 6.5 17.5 5.5 16.5 5H15" stroke={gold} strokeWidth="1.5" />
      <path d="M11 12C11 13 11.5 14 12 14C12.5 14 13 13 13 12" stroke={dark} strokeWidth="1.5" />
      <rect x="10" y="15" width="4" height="2" fill={gold} />
      <rect x="8" y="17" width="8" height="2" fill={gold} opacity="0.8" />
    </svg>
  );
}

export function IconUser(props) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="9" r="3" fill={gold} />
      <path
        d="M6 18C6.8 15.5 9 14 12 14C15 14 17.2 15.5 18 18"
        stroke={gold}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="10" stroke={gold} strokeWidth="1.5" />
    </svg>
  );
}

export function IconClock(props) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="9" stroke={gold} strokeWidth="1.8" />
      <path
        d="M12 7V12L15 14"
        stroke={gold}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconField(props) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="4" y="5" width="16" height="14" rx="2" stroke={gold} strokeWidth="1.8" />
      <line x1="12" y1="5" x2="12" y2="19" stroke={gold} strokeWidth="1.2" />
      <circle cx="12" cy="12" r="2" stroke={gold} strokeWidth="1.2" />
      <path d="M4 10C6 10.5 6 13.5 4 14" stroke={gold} strokeWidth="1.2" />
      <path d="M20 10C18 10.5 18 13.5 20 14" stroke={gold} strokeWidth="1.2" />
    </svg>
  );
}

export function IconCheck(props) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="10" fill={dark} stroke={gold} strokeWidth="2" />
      <path
        d="M8 12.5L10.5 15L16 9"
        stroke={gold}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconCross(props) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="10" fill={dark} stroke={gold} strokeWidth="2" />
      <path
        d="M9 9L15 15M15 9L9 15"
        stroke={gold}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconQuestion(props) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="10" fill={dark} stroke={gold} strokeWidth="2" />
      <path
        d="M10 9C10 7.9 10.9 7 12 7C13.1 7 14 7.9 14 9C14 9.8 13.6 10.2 13 10.6C12.4 11 12 11.4 12 12"
        stroke={gold}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16" r="1" fill={gold} />
    </svg>
  );
}

export function IconStar(props) {
  return (
    <svg {...baseProps} {...props}>
      <path
        d="M12 4L13.9 8.1L18.4 8.6L15 11.6L15.9 16L12 13.8L8.1 16L9 11.6L5.6 8.6L10.1 8.1L12 4Z"
        fill={gold}
        stroke={gold}
        strokeWidth="0.8"
      />
    </svg>
  );
}
