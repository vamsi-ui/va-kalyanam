import React from 'react';

interface SymbolProps {
  className?: string;
  size?: number;
  color?: string; // Optional override; defaults to rich metallic gold
  accentColor?: string; // Crimson / ruby accent
}

/**
 * Sacred Thirunamam (Vaishnavite Tilak) with Shanku (Conch) and Chakra (Discus)
 * Invokes Lord Vishnu for groom Vishnu & bride Akshitha with divine blessings.
 */
export function ThirunamamSymbol({
  className = '',
  size = 48,
  color = '#D4AF37',
  accentColor = '#B22222',
}: SymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)] ${className}`}
      aria-label="Sacred Thirunamam Symbol"
    >
      <defs>
        <linearGradient id="goldGradThiru" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2A3" />
          <stop offset="40%" stopColor="#D4AF37" />
          <stop offset="80%" stopColor="#AA7A1E" />
          <stop offset="100%" stopColor="#F5D77F" />
        </linearGradient>
        <linearGradient id="redGradThiru" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E60000" />
          <stop offset="50%" stopColor="#9E0C15" />
          <stop offset="100%" stopColor="#600007" />
        </linearGradient>
      </defs>

      {/* Halo / Aura back glow */}
      <circle cx="50" cy="50" r="44" stroke="url(#goldGradThiru)" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />

      {/* Left Shanku (Conch) Motif */}
      <g opacity="0.9">
        <path
          d="M22 42 C16 46, 15 54, 18 59 C21 64, 27 64, 28 58 C29 53, 26 47, 22 42 Z"
          fill="url(#goldGradThiru)"
        />
        <path
          d="M22 36 C23 39, 21 42, 19 44"
          stroke="url(#goldGradThiru)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Swirl lines */}
        <path d="M20 48 Q23 53 25 51" stroke="#600007" strokeWidth="0.8" />
      </g>

      {/* Right Sudarshana Chakra (Discus) Motif */}
      <g opacity="0.9">
        <circle cx="78" cy="50" r="9" stroke="url(#goldGradThiru)" strokeWidth="1.5" />
        <circle cx="78" cy="50" r="4" fill="url(#goldGradThiru)" />
        {/* Rays / spokes */}
        <line x1="78" y1="38" x2="78" y2="44" stroke="url(#goldGradThiru)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="78" y1="56" x2="78" y2="62" stroke="url(#goldGradThiru)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="66" y1="50" x2="72" y2="50" stroke="url(#goldGradThiru)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="84" y1="50" x2="90" y2="50" stroke="url(#goldGradThiru)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="70" y1="42" x2="74" y2="46" stroke="url(#goldGradThiru)" strokeWidth="1.2" />
        <line x1="82" y1="54" x2="86" y2="58" stroke="url(#goldGradThiru)" strokeWidth="1.2" />
        <line x1="86" y1="42" x2="82" y2="46" stroke="url(#goldGradThiru)" strokeWidth="1.2" />
        <line x1="74" y1="54" x2="70" y2="58" stroke="url(#goldGradThiru)" strokeWidth="1.2" />
      </g>

      {/* Sacred Base Pedestal (Padma peedam) */}
      <path
        d="M38 74 C42 71, 46 70, 50 70 C54 70, 58 71, 62 74 C58 76, 54 77, 50 77 C46 77, 42 76, 38 74 Z"
        fill="url(#goldGradThiru)"
      />
      <circle cx="50" cy="74.5" r="1.5" fill="#600007" />

      {/* White / Gold Namam Wings (Urdhva Pundra) */}
      {/* Left Wing */}
      <path
        d="M40 70 C39 56, 34 38, 38 24 C40 20, 43 25, 43 32 C43 45, 45 58, 46 70 Z"
        fill="#FFFFFF"
        stroke="url(#goldGradThiru)"
        strokeWidth="1.2"
      />
      {/* Right Wing */}
      <path
        d="M60 70 C61 56, 66 38, 62 24 C60 20, 57 25, 57 32 C57 45, 55 58, 54 70 Z"
        fill="#FFFFFF"
        stroke="url(#goldGradThiru)"
        strokeWidth="1.2"
      />

      {/* Central Sacred Red Tilak / Sricharanam (Vermilion Line) */}
      <path
        d="M48.5 70 C48.5 56, 48.2 42, 48.8 28 C49.2 22, 50.8 22, 51.2 28 C51.8 42, 51.5 56, 51.5 70 Z"
        fill="url(#redGradThiru)"
        stroke="url(#goldGradThiru)"
        strokeWidth="0.8"
      />

      {/* Crown Lotus or Kasturi dot at top */}
      <circle cx="50" cy="18" r="2.5" fill="url(#goldGradThiru)" />
      <path d="M47 18 Q50 14 53 18" stroke="url(#goldGradThiru)" strokeWidth="1" fill="none" />
    </svg>
  );
}

/**
 * Traditional Nilavilakku (Auspicious Kerala / South Indian Brass Oil Lamp)
 * Symbolizes prosperity, divine light, and auspicious beginnings.
 */
export function NilavilakkuSymbol({
  className = '',
  size = 48,
  glow = true,
}: SymbolProps & { glow?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
      aria-label="Traditional Nilavilakku Brass Lamp"
    >
      <defs>
        <linearGradient id="goldGradLamp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF3B0" />
          <stop offset="35%" stopColor="#E5C158" />
          <stop offset="70%" stopColor="#C49A2D" />
          <stop offset="100%" stopColor="#8C6615" />
        </linearGradient>
        <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF275" stopOpacity="1" />
          <stop offset="40%" stopColor="#FF9F1C" stopOpacity="0.85" />
          <stop offset="75%" stopColor="#E71D36" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7B0016" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="flameCore" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FF3838" />
          <stop offset="45%" stopColor="#FFA600" />
          <stop offset="85%" stopColor="#FFF7A1" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>
      </defs>

      {/* Flickering Flame Aura Glow */}
      {glow && (
        <circle cx="50" cy="22" r="18" fill="url(#flameGlow)" className="animate-pulse" />
      )}

      {/* Central Flame */}
      <g>
        <path
          d="M50 8 C46 15, 44 20, 46 25 C47.5 28.5, 52.5 28.5, 54 25 C56 20, 54 15, 50 8 Z"
          fill="url(#flameCore)"
          className="drop-shadow-[0_0_6px_rgba(255,215,0,0.8)]"
        />
        <circle cx="50" cy="22" r="2" fill="#FFFFFF" opacity="0.9" />
      </g>

      {/* Side Wick Flames */}
      <path
        d="M32 29 C30 25, 32 22, 34 20 C35 23, 37 26, 35 29 Z"
        fill="url(#flameCore)"
        opacity="0.9"
      />
      <path
        d="M68 29 C70 25, 68 22, 66 20 C65 23, 63 26, 65 29 Z"
        fill="url(#flameCore)"
        opacity="0.9"
      />

      {/* Crown Finial / Bird (Annapakshi) crest on lamp */}
      <path
        d="M50 27 L51.5 30 L48.5 30 Z"
        fill="url(#goldGradLamp)"
      />

      {/* Oil Reservoir Dish (Thattu) */}
      <ellipse cx="50" cy="33" rx="24" ry="5.5" fill="url(#goldGradLamp)" stroke="#AA7A1E" strokeWidth="0.8" />
      <ellipse cx="50" cy="32" rx="20" ry="3.5" fill="#754C0C" opacity="0.5" />

      {/* Hanging Bell / Beaded Ornaments under Dish */}
      <path
        d="M36 37 Q38 41 40 37 M46 37 Q48 42 50 37 M56 37 Q58 41 60 37"
        stroke="url(#goldGradLamp)"
        strokeWidth="1.2"
        fill="none"
      />
      <circle cx="38" cy="41" r="1.2" fill="url(#goldGradLamp)" />
      <circle cx="48" cy="42" r="1.2" fill="url(#goldGradLamp)" />
      <circle cx="58" cy="41" r="1.2" fill="url(#goldGradLamp)" />

      {/* Decorative Upper Stem Ring */}
      <rect x="46" y="38" width="8" height="5" rx="1.5" fill="url(#goldGradLamp)" />

      {/* Elegant Fluted Pillar Stem */}
      <path
        d="M47 43 L45 76 L55 76 L53 43 Z"
        fill="url(#goldGradLamp)"
        stroke="#AA7A1E"
        strokeWidth="0.6"
      />
      {/* Stem vertical highlights */}
      <line x1="50" y1="44" x2="50" y2="75" stroke="#FFF7A1" strokeWidth="1" opacity="0.7" />

      {/* Central Bulge Ring (Kumbham) */}
      <ellipse cx="50" cy="58" rx="8" ry="4" fill="url(#goldGradLamp)" stroke="#AA7A1E" strokeWidth="0.8" />
      <circle cx="50" cy="58" r="1.5" fill="#5E3803" />

      {/* Lower Stem Base Ring */}
      <ellipse cx="50" cy="78" rx="12" ry="3.5" fill="url(#goldGradLamp)" stroke="#AA7A1E" strokeWidth="0.8" />

      {/* Stepped Tiered Base (Peedam) */}
      <path
        d="M36 82 L34 89 L66 89 L64 82 Z"
        fill="url(#goldGradLamp)"
        stroke="#AA7A1E"
        strokeWidth="0.8"
      />
      <ellipse cx="50" cy="82" rx="14" ry="2.5" fill="url(#goldGradLamp)" />

      {/* Broad Base Pedestal with Lotus Petal engraving */}
      <path
        d="M28 92 C28 90, 72 90, 72 92 L75 102 C75 106, 25 106, 25 102 Z"
        fill="url(#goldGradLamp)"
        stroke="#8C6615"
        strokeWidth="1"
      />
      {/* Lotus Petal engravings on base */}
      <path
        d="M32 99 Q36 94 40 99 Q44 94 48 99 Q52 94 56 99 Q60 94 64 99 Q68 94 71 99"
        stroke="#7A4E0B"
        strokeWidth="1.2"
        fill="none"
      />

      {/* Bottom Foundation Rim */}
      <rect x="22" y="103" width="56" height="5" rx="2" fill="url(#goldGradLamp)" stroke="#7A4E0B" strokeWidth="0.8" />
    </svg>
  );
}

/**
 * Royal Caparisoned Temple Elephant (Gaja) with Nettipattam & Golden Adornments
 * Symbolizes royalty, good fortune, strength, and South Indian heritage.
 */
export function GajaSymbol({
  className = '',
  size = 56,
  facing = 'left',
}: SymbolProps & { facing?: 'left' | 'right' }) {
  const transform = facing === 'right' ? 'scale(-1, 1) translate(-100, 0)' : undefined;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
      aria-label="Royal Golden Elephant (Gaja)"
    >
      <defs>
        <linearGradient id="goldGradGaja" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF3B0" />
          <stop offset="35%" stopColor="#E5C158" />
          <stop offset="70%" stopColor="#C49A2D" />
          <stop offset="100%" stopColor="#8C6615" />
        </linearGradient>
        <linearGradient id="clothRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B30018" />
          <stop offset="100%" stopColor="#66000C" />
        </linearGradient>
      </defs>

      <g transform={transform}>
        {/* Elephant Body Silhouette in Rich Gold */}
        {/* Head & Back Curve */}
        <path
          d="M68 68 L68 55 C68 45, 62 38, 52 38 C42 38, 36 42, 32 46 C28 42, 22 41, 16 46 C12 50, 10 57, 10 65 L10 75 L18 75 L18 64 C20 62, 24 62, 26 65 L26 75 L34 75 L34 60 C36 58, 42 58, 44 60 L44 75 L52 75 L52 64 C55 64, 58 64, 60 66 L60 75 L68 75 Z"
          fill="url(#goldGradGaja)"
          stroke="#7A4E0B"
          strokeWidth="1.2"
        />

        {/* Upward Graceful Trunk (Mangala Trunk) */}
        <path
          d="M14 52 C9 54, 4 60, 5 69 C6 77, 13 80, 17 78 C21 76, 21 70, 17 68 C14 67, 12 70, 11 68 C10 65, 12 60, 17 58 Z"
          fill="url(#goldGradGaja)"
          stroke="#7A4E0B"
          strokeWidth="1"
        />

        {/* Golden Tusk */}
        <path
          d="M17 57 C13 59, 10 62, 8 61 C10 59, 14 55, 17 55 Z"
          fill="#FFFFFF"
          stroke="url(#goldGradGaja)"
          strokeWidth="0.8"
        />

        {/* Royal Nettipattam (Gold Forehead Ornament plate) */}
        <path
          d="M18 45 C20 40, 26 39, 29 44 C27 49, 21 51, 18 45 Z"
          fill="url(#goldGradGaja)"
          stroke="#5E3803"
          strokeWidth="0.8"
        />
        {/* Nettipattam Beads / Jewels */}
        <circle cx="23" cy="44" r="1.5" fill="#B30018" />
        <circle cx="26" cy="42" r="1" fill="#FFF3B0" />
        <circle cx="20" cy="46" r="1" fill="#FFF3B0" />

        {/* Large Decorative Ear */}
        <path
          d="M28 44 C34 44, 37 50, 36 57 C35 63, 29 65, 27 60 C26 55, 26 48, 28 44 Z"
          fill="url(#goldGradGaja)"
          stroke="#7A4E0B"
          strokeWidth="1.2"
        />
        {/* Ear inner highlight */}
        <path
          d="M29 48 C32 48, 34 52, 33 56 C32 59, 29 60, 28 58"
          stroke="#AA7A1E"
          strokeWidth="0.8"
          fill="none"
        />

        {/* Eye */}
        <ellipse cx="20" cy="47" rx="1.5" ry="1" fill="#2E1A02" />
        <circle cx="20.4" cy="46.8" r="0.5" fill="#FFF" />

        {/* Royal Howdah / Ceremonial Saddle Cloth (Caparison) */}
        <path
          d="M38 43 C42 41, 52 41, 56 43 L58 56 C53 58, 41 58, 36 56 Z"
          fill="url(#clothRedGrad)"
          stroke="url(#goldGradGaja)"
          strokeWidth="1.2"
        />
        {/* Gold Embroidery on Saddle */}
        <circle cx="47" cy="49" r="3" stroke="url(#goldGradGaja)" strokeWidth="1" fill="none" />
        <path d="M47 46 L47 52 M44 49 L50 49" stroke="url(#goldGradGaja)" strokeWidth="0.8" />
        {/* Saddle Tassels */}
        <line x1="39" y1="56" x2="39" y2="60" stroke="url(#goldGradGaja)" strokeWidth="1" />
        <line x1="43" y1="57" x2="43" y2="61" stroke="url(#goldGradGaja)" strokeWidth="1" />
        <line x1="47" y1="57" x2="47" y2="61" stroke="url(#goldGradGaja)" strokeWidth="1" />
        <line x1="51" y1="57" x2="51" y2="61" stroke="url(#goldGradGaja)" strokeWidth="1" />
        <line x1="55" y1="56" x2="55" y2="60" stroke="url(#goldGradGaja)" strokeWidth="1" />

        {/* Tail */}
        <path
          d="M68 56 C71 62, 71 68, 70 73"
          stroke="url(#goldGradGaja)"
          strokeWidth="1.2"
          fill="none"
        />
        <circle cx="70" cy="74" r="1.2" fill="#7A4E0B" />

        {/* Foot Ornaments / Anklets (Golusu) */}
        <line x1="10" y1="73" x2="18" y2="73" stroke="#FFF3B0" strokeWidth="1.2" />
        <line x1="26" y1="73" x2="34" y2="73" stroke="#FFF3B0" strokeWidth="1.2" />
        <line x1="44" y1="73" x2="52" y2="73" stroke="#FFF3B0" strokeWidth="1.2" />
        <line x1="60" y1="73" x2="68" y2="73" stroke="#FFF3B0" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

/**
 * Sacred Golden Lotus (Padma)
 * Traditional South Indian motif of purity, spiritual prosperity, and divine beauty.
 */
export function PadmaSymbol({
  className = '',
  size = 40,
}: SymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block drop-shadow-[0_2px_6px_rgba(212,175,55,0.35)] ${className}`}
      aria-label="Sacred Lotus (Padma)"
    >
      <defs>
        <linearGradient id="lotusGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF3B0" />
          <stop offset="40%" stopColor="#E5C158" />
          <stop offset="75%" stopColor="#C49A2D" />
          <stop offset="100%" stopColor="#8C6615" />
        </linearGradient>
      </defs>

      {/* Outer Side Petals Left */}
      <path
        d="M22 62 C16 48, 20 34, 34 26 C30 36, 32 50, 42 58 Z"
        fill="url(#lotusGoldGrad)"
        opacity="0.8"
        stroke="#8C6615"
        strokeWidth="0.8"
      />
      {/* Outer Side Petals Right */}
      <path
        d="M78 62 C84 48, 80 34, 66 26 C70 36, 68 50, 58 58 Z"
        fill="url(#lotusGoldGrad)"
        opacity="0.8"
        stroke="#8C6615"
        strokeWidth="0.8"
      />

      {/* Mid Petals Left */}
      <path
        d="M32 64 C28 46, 35 30, 45 18 C43 32, 47 48, 50 62 Z"
        fill="url(#lotusGoldGrad)"
        stroke="#8C6615"
        strokeWidth="0.8"
      />
      {/* Mid Petals Right */}
      <path
        d="M68 64 C72 46, 65 30, 55 18 C57 32, 53 48, 50 62 Z"
        fill="url(#lotusGoldGrad)"
        stroke="#8C6615"
        strokeWidth="0.8"
      />

      {/* Central Prime Lotus Petal */}
      <path
        d="M50 10 C43 24, 42 42, 50 65 C58 42, 57 24, 50 10 Z"
        fill="url(#lotusGoldGrad)"
        stroke="#8C6615"
        strokeWidth="1"
      />

      {/* Center Petal Spine */}
      <line x1="50" y1="18" x2="50" y2="60" stroke="#FFF8C9" strokeWidth="1" opacity="0.8" />

      {/* Base Calyx & Leaf Scrolls */}
      <path
        d="M28 66 C35 72, 65 72, 72 66 C65 64, 35 64, 28 66 Z"
        fill="url(#lotusGoldGrad)"
        stroke="#8C6615"
        strokeWidth="1"
      />
      {/* Curling Leaf Tendrils */}
      <path
        d="M30 68 Q20 72 16 66 Q20 62 25 64"
        stroke="url(#lotusGoldGrad)"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M70 68 Q80 72 84 66 Q80 62 75 64"
        stroke="url(#lotusGoldGrad)"
        strokeWidth="1.2"
        fill="none"
      />
      <circle cx="50" cy="68" r="2" fill="#7A0016" />
    </svg>
  );
}

/**
 * Ornate Classical Monogram Crest "A & V" (or "A & Vi")
 * Authentic wedding emblem with royal gold filigree laurels and traditional flourish.
 */
export function RoyalMonogramEmblem({
  className = '',
  size = 140,
  subtext = 'When Keralam met Andhra',
}: {
  className?: string;
  size?: number;
  subtext?: string;
}) {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_6px_20px_rgba(0,0,0,0.5)]"
      >
        <defs>
          <linearGradient id="goldEmblemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF7BD" />
            <stop offset="30%" stopColor="#E5C158" />
            <stop offset="70%" stopColor="#B88A22" />
            <stop offset="100%" stopColor="#F5D77F" />
          </linearGradient>
          <radialGradient id="innerRedGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8A0018" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#5E0010" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#3F000A" stopOpacity="1" />
          </radialGradient>
        </defs>

        {/* Outer Radiant Sunburst Ring / Dots */}
        <circle cx="100" cy="100" r="92" stroke="url(#goldEmblemGrad)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <circle cx="100" cy="100" r="86" stroke="url(#goldEmblemGrad)" strokeWidth="1.5" />

        {/* Inner Card Backdrop Disc */}
        <circle cx="100" cy="100" r="82" fill="url(#innerRedGlow)" stroke="url(#goldEmblemGrad)" strokeWidth="2" />

        {/* Classical Scalloped Laurel Garland / Temple Toran pattern */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24;
          const rad = (angle * Math.PI) / 180;
          const x = 100 + 76 * Math.cos(rad);
          const y = 100 + 76 * Math.sin(rad);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="2"
              fill="url(#goldEmblemGrad)"
              opacity="0.8"
            />
          );
        })}

        {/* Top Royal Crown / Kalash Finial */}
        <g transform="translate(100, 26)">
          <path
            d="M-10 6 L0 -2 L10 6 L6 10 L-6 10 Z"
            fill="url(#goldEmblemGrad)"
          />
          <circle cx="0" cy="-4" r="2" fill="url(#goldEmblemGrad)" />
          <circle cx="-10" cy="6" r="1.5" fill="url(#goldEmblemGrad)" />
          <circle cx="10" cy="6" r="1.5" fill="url(#goldEmblemGrad)" />
        </g>

        {/* Bottom Lotus Motif on Emblem */}
        <g transform="translate(100, 168) scale(0.35)">
          <path
            d="M-30 0 C-20 -20, -10 -30, 0 -35 C10 -30, 20 -20, 30 0 Z"
            fill="url(#goldEmblemGrad)"
          />
          <circle cx="0" cy="4" r="3" fill="url(#goldEmblemGrad)" />
        </g>

        {/* Monogram Letters "A & V" in Classic Golden Calligraphy */}
        <g id="letters" className="select-none">
          {/* Letter A */}
          <text
            x="74"
            y="114"
            textAnchor="middle"
            fontFamily="'Cormorant Garamond', 'Cinzel', serif"
            fontSize="52"
            fontWeight="600"
            fontStyle="italic"
            fill="url(#goldEmblemGrad)"
            letterSpacing="0"
            className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            A
          </text>

          {/* Ampersand & */}
          <text
            x="100"
            y="106"
            textAnchor="middle"
            fontFamily="'Great Vibes', 'Playfair Display', cursive"
            fontSize="30"
            fontWeight="400"
            fill="#FFF3B0"
            opacity="0.9"
            className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
          >
            &
          </text>

          {/* Letter V */}
          <text
            x="126"
            y="114"
            textAnchor="middle"
            fontFamily="'Cormorant Garamond', 'Cinzel', serif"
            fontSize="52"
            fontWeight="600"
            fontStyle="italic"
            fill="url(#goldEmblemGrad)"
            letterSpacing="0"
            className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            V
          </text>
        </g>

        {/* Ornamental Flourish Under Initials */}
        <path
          d="M60 128 C75 133, 90 126, 100 130 C110 126, 125 133, 140 128"
          stroke="url(#goldEmblemGrad)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="100" cy="130" r="1.8" fill="url(#goldEmblemGrad)" />
        <circle cx="70" cy="129" r="1" fill="url(#goldEmblemGrad)" />
        <circle cx="130" cy="129" r="1" fill="url(#goldEmblemGrad)" />

        {/* Subtle Wedding Year 2026-27 */}
        <text
          x="100"
          y="144"
          textAnchor="middle"
          fontFamily="'Montserrat', sans-serif"
          fontSize="7"
          letterSpacing="3"
          fill="#FFFDD0"
          opacity="0.8"
          className="uppercase tracking-widest font-light"
        >
          2026 · 2027
        </text>
      </svg>
      {subtext && (
        <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-serif mt-2 font-medium">
          {subtext}
        </span>
      )}
    </div>
  );
}

/**
 * Authentic Ornate Gold Linked Border (Temple Chain & Trellis)
 * Inspired by the frame in website theme.jpeg.
 */
export function GoldLinkedBorderFrame({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative p-3 sm:p-5 rounded-lg ${className}`}>
      {/* Outer Golden Border Line */}
      <div className="absolute inset-1.5 sm:inset-2.5 border-2 border-[#D4AF37]/70 rounded-md pointer-events-none" />

      {/* Inner Thin Double Golden Line */}
      <div className="absolute inset-3 sm:inset-4 border border-[#D4AF37]/40 rounded pointer-events-none" />

      {/* Four Ornate Corner Mandalas */}
      <CornerFlourish position="top-left" />
      <CornerFlourish position="top-right" />
      <CornerFlourish position="bottom-left" />
      <CornerFlourish position="bottom-right" />

      {/* Top & Bottom Center Toran Crests */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 pointer-events-none">
        <CenterArchOrnament />
      </div>
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 rotate-180 pointer-events-none">
        <CenterArchOrnament />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/**
 * Ornate Corner Flourish for Cards and Frames
 */
export function CornerFlourish({
  position,
  size = 40,
}: {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: number;
}) {
  const getTransform = () => {
    switch (position) {
      case 'top-left':
        return 'top-1 left-1';
      case 'top-right':
        return 'top-1 right-1 scale-x-[-1]';
      case 'bottom-left':
        return 'bottom-1 left-1 scale-y-[-1]';
      case 'bottom-right':
        return 'bottom-1 right-1 scale-[-1]';
    }
  };

  return (
    <div className={`absolute ${getTransform()} pointer-events-none z-20`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 2 L32 2 C32 10, 25 18, 18 18 C18 25, 10 32, 2 32 Z"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1.2"
        />
        <path
          d="M6 6 L24 6 C24 11, 20 16, 16 16 C16 20, 11 24, 6 24 Z"
          fill="#D4AF37"
          fillOpacity="0.25"
          stroke="#D4AF37"
          strokeWidth="0.8"
        />
        <circle cx="10" cy="10" r="2.5" fill="#D4AF37" />
        <circle cx="2" cy="2" r="3" fill="#D4AF37" />
        <path d="M2 2 L12 12" stroke="#D4AF37" strokeWidth="1" />
      </svg>
    </div>
  );
}

/**
 * Small Center Arch Motif for Borders
 */
function CenterArchOrnament() {
  return (
    <svg width="44" height="14" viewBox="0 0 44 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 12 Q12 2 22 2 Q32 2 42 12"
        stroke="#D4AF37"
        strokeWidth="1.2"
        fill="none"
      />
      <circle cx="22" cy="2" r="2" fill="#D4AF37" />
      <circle cx="12" cy="7" r="1.2" fill="#D4AF37" />
      <circle cx="32" cy="7" r="1.2" fill="#D4AF37" />
    </svg>
  );
}

/**
 * Classical Red & Gold Section Divider with Lotus and Toran Chain
 */
export function RedGoldDivider({
  symbol = 'lotus',
  className = '',
}: {
  symbol?: 'lotus' | 'thirunamam' | 'lamp' | 'elephant';
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-center gap-3 my-6 ${className}`}>
      <div className="flex items-center gap-1">
        <span className="w-12 sm:w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
        <span className="w-2 h-2 rotate-45 border border-[#D4AF37] bg-[#7B0016]" />
      </div>

      <div className="shrink-0">
        {symbol === 'lotus' && <PadmaSymbol size={32} />}
        {symbol === 'thirunamam' && <ThirunamamSymbol size={34} />}
        {symbol === 'lamp' && <NilavilakkuSymbol size={32} />}
        {symbol === 'elephant' && <GajaSymbol size={34} />}
      </div>

      <div className="flex items-center gap-1">
        <span className="w-2 h-2 rotate-45 border border-[#D4AF37] bg-[#7B0016]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
        <span className="w-12 sm:w-20 h-[1.5px] bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37]" />
      </div>
    </div>
  );
}
