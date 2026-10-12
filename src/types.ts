export type CharacterType = 'vishnu' | 'akshitha';

export type GameState = 'select' | 'playing' | 'paused' | 'won' | 'gameover';

export interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  vy: number;
  isGrounded: boolean;
  isJumping: boolean;
  isSliding: boolean;
  slideTimer: number;
  jumpCount: number;
  maxJumps: number;
  state: 'run' | 'jump' | 'slide' | 'celebrate' | 'hit';
  frame: number;
  invincibleTimer: number; // blinking after hit
  shieldTimer: number;     // from Kalash
  magnetTimer: number;     // from Garland
}

export type ObstacleType = 
  | 'aunties'
  | 'musician'
  | 'photographer'
  | 'shorter_pot'
  | 'pot_stack'
  | 'marigold_barrier'
  | 'bridal_doli';

export interface Obstacle {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  type: ObstacleType;
  requiresSlide?: boolean; // high barrier requiring slide
  requiresJump?: boolean;  // ground obstacle requiring jump
  hit?: boolean;
  flashTimer?: number;     // for photographer flash
}

export type CollectibleType = 'coin' | 'laddu' | 'kalash' | 'garland';

export interface Collectible {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  type: CollectibleType;
  collected?: boolean;
  floatingOffset?: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  type: 'petal' | 'sparkle' | 'flash' | 'star' | 'heart';
  rotation: number;
  rotationSpeed: number;
  life: number;
  maxLife: number;
  alpha: number;
}

export interface GameStats {
  score: number;
  coins: number;
  laddus: number;
  distance: number;
  targetDistance: number;
  hearts: number;
  maxHearts: number;
  startTime: number;
  elapsedTime: number;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  themeClass: string;
  bgClass: string;
  timestamp: Date;
}
