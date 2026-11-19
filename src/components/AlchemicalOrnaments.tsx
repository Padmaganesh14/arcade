export function WorkbenchBackgroundGeometry() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
    >
      {/* Subtle mineral/parchment noise grain over the dark workbench */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.045]" xmlns="http://www.w3.org/2000/svg">
        <filter id="workbench-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.78" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#workbench-grain)" />
      </svg>

      {/* Top-right grand brass & amethyst transmutation astrolabe */}
      <svg
        className="absolute -right-36 -top-36 h-[780px] w-[780px] text-[#c79a4b] opacity-[0.16]"
        viewBox="0 0 600 600"
        fill="none"
      >
        <circle cx="300" cy="300" r="280" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" />
        <circle cx="300" cy="300" r="245" stroke="currentColor" strokeWidth="1.25" />
        <circle cx="300" cy="300" r="185" stroke="#9f75d6" strokeWidth="1" strokeDasharray="3 6" />
        <circle cx="300" cy="300" r="120" stroke="currentColor" strokeWidth="0.9" />
        <polygon points="300,55 512,422 88,422" stroke="currentColor" strokeWidth="1" />
        <polygon points="300,545 88,178 512,178" stroke="#9f75d6" strokeWidth="1" />
        <rect
          x="176"
          y="176"
          width="248"
          height="248"
          stroke="currentColor"
          strokeWidth="0.8"
          transform="rotate(45 300 300)"
        />
        <circle cx="300" cy="300" r="46" stroke="currentColor" strokeWidth="1.2" />
      </svg>

      {/* Bottom-left arcane celestial circle */}
      <svg
        className="absolute -bottom-44 -left-44 h-[640px] w-[640px] text-[#8b5cf6] opacity-[0.15]"
        viewBox="0 0 500 500"
        fill="none"
      >
        <circle cx="250" cy="250" r="228" stroke="currentColor" strokeWidth="1" strokeDasharray="4 10" />
        <circle cx="250" cy="250" r="175" stroke="#c79a4b" strokeWidth="1" />
        <circle cx="250" cy="250" r="95" stroke="currentColor" strokeWidth="0.9" strokeDasharray="2 5" />
        <polygon points="250,40 460,250 250,460 40,250" stroke="currentColor" strokeWidth="1" />
        <polygon points="102,102 398,102 398,398 102,398" stroke="#c79a4b" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

export function OrnateCornerFiligree({
  position,
}: {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}) {
  const rotationClass = {
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2 rotate-90',
    'bottom-right': 'bottom-2 right-2 rotate-180',
    'bottom-left': 'bottom-2 left-2 -rotate-90',
  }[position];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 52 52"
      fill="none"
      className={`pointer-events-none absolute h-10 w-10 text-[#d4a652]/80 ${rotationClass}`}
    >
      <path d="M2 34V7C2 4.23858 4.23858 2 7 2H34" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 26V11C9 9.89543 9.89543 9 11 9H26" stroke="#a87ff0" strokeWidth="1" strokeOpacity="0.75" />
      <polygon points="9,4 12,9 9,14 6,9" fill="#9f75d6" fillOpacity="0.85" stroke="currentColor" strokeWidth="0.8" />
      <path d="M2 18L7 13M18 2L13 7" stroke="currentColor" strokeWidth="1" />
      <circle cx="22" cy="5.5" r="1.3" fill="currentColor" />
      <circle cx="5.5" cy="22" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function AlchemicalDivider({ label }: { label?: string }) {
  return (
    <div className="my-8 flex items-center gap-4" role="separator">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#9b7438]/65 to-[#d4a652]/85" />
      <div className="flex items-center gap-3 text-[#d4a957]">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 text-[#a87ff0]" fill="none">
          <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="12" cy="12" r="2" fill="#e6c478" />
        </svg>
        {label ? (
          <span className="font-display text-xs font-bold tracking-[0.22em] text-[#edd08b]">
            {label}
          </span>
        ) : null}
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 text-[#a87ff0]" fill="none">
          <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="12" cy="12" r="2" fill="#e6c478" />
        </svg>
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#9b7438]/65 to-[#d4a652]/85" />
    </div>
  );
}

export function ScryingMirrorSigil() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 240"
      fill="none"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
    >
      <circle cx="120" cy="120" r="102" stroke="#c99b49" strokeWidth="1" strokeDasharray="4 6" />
      <circle cx="120" cy="120" r="82" stroke="#9f75d6" strokeWidth="1" />
      <polygon points="120,26 201,167 39,167" stroke="#c99b49" strokeWidth="0.9" />
      <polygon points="120,214 39,73 201,73" stroke="#9f75d6" strokeWidth="0.9" />
    </svg>
  );
}
