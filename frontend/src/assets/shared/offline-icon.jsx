export default function OfflineIcon({ className, ...props }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      viewBox="0 0 84 84"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g className="offline-icon__wifi">
        <path
          className="offline-icon__arc offline-icon__arc--large"
          d="M22 50A20 20 0 0 1 62 50"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          className="offline-icon__arc offline-icon__arc--medium"
          d="M30 50A12 12 0 0 1 54 50"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          className="offline-icon__arc offline-icon__arc--small"
          d="M36 50A6 6 0 0 1 48 50"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <circle
          className="offline-icon__dot"
          cx="42"
          cy="54"
          fill="currentColor"
          r="2.5"
        />
      </g>

      <path
        className="offline-icon__slash"
        d="M27 27L57 57"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
    </svg>
  );
}
