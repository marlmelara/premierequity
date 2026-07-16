// Premier Equity emblem: double-ring badge with an upward growth/arrow mark,
// recolored from the original blue/black art into the site's forest + olive palette.
export function BrandMark({
  size = 36,
  light = false,
  className = "",
}: {
  size?: number;
  light?: boolean;
  className?: string;
}) {
  const ring = light ? "#ffffff" : "#0f422c";
  const innerRing = "#5ca11e";
  const dark = light ? "#ffffff" : "#0f422c";
  const olive = "#5ca11e";
  const oliveDark = "#4a8318";
  const gradId = light ? "pe-olive-light" : "pe-olive-dark";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Premier Equity"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={olive} />
          <stop offset="1" stopColor={oliveDark} />
        </linearGradient>
      </defs>

      <circle cx="120" cy="120" r="112" stroke={ring} strokeWidth="4" />
      <circle cx="120" cy="120" r="100" stroke={innerRing} strokeWidth="2" />

      {/* ascending bars */}
      <rect x="70" y="150" width="26" height="42" rx="2" fill={dark} />
      <rect x="104" y="126" width="26" height="66" rx="2" fill={dark} />
      <rect x="138" y="108" width="26" height="84" rx="2" fill={`url(#${gradId})`} />

      {/* arrowhead / peaked roof, split two-tone */}
      <polygon points="82,112 120,70 120,112" fill={dark} />
      <polygon points="120,70 158,112 120,112" fill={`url(#${gradId})`} />
    </svg>
  );
}
