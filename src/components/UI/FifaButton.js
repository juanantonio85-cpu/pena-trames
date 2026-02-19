import React from "react";

export default function FifaButton({
  children,
  onClick,
  type = "primary",
  icon = null,
  iconRight = null,
  style
}) {
  const baseStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    letterSpacing: "0.03em",
    marginBottom: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    transition: "transform 0.1s ease, box-shadow 0.1s ease, background 0.2s",
  };

  const variants = {
    primary: {
      background: "linear-gradient(135deg, #facc15, #eab308)",
      color: "#111827",
      boxShadow: "0 4px 12px rgba(250, 204, 21, 0.4)",
    },
    secondary: {
      background: "linear-gradient(135deg, #4b5563, #374151)",
      color: "white",
      boxShadow: "0 4px 12px rgba(15, 23, 42, 0.6)",
    },
    danger: {
      background: "linear-gradient(135deg, #ef4444, #dc2626)",
      color: "white",
      boxShadow: "0 4px 12px rgba(239, 68, 68, 0.5)",
    },
    success: {
      background: "linear-gradient(135deg, #22c55e, #16a34a)",
      color: "white",
      boxShadow: "0 4px 12px rgba(34, 197, 94, 0.5)",
    },
    info: {
      background: "linear-gradient(135deg, #3b82f6, #2563eb)",
      color: "white",
      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.5)",
    }
  };

  const finalStyle = {
    ...baseStyle,
    ...(variants[type] || variants.primary),
    ...style,
  };

  return (
    <button
      onClick={onClick}
      style={finalStyle}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "scale(0.97)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {icon && <img src={icon} alt="" style={{ width: 20, height: 20 }} />}
      {children}
      {iconRight && (
        <img src={iconRight} alt="" style={{ width: 20, height: 20 }} />
      )}
    </button>
  );
}
