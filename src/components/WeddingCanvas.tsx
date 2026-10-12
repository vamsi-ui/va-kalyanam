import React, { useEffect, useRef, useCallback } from 'react';
import { CharacterType, GameState, Player, Obstacle, Collectible, Particle, ObstacleType, CollectibleType } from '../types';
import { SpriteRenderer } from './Sprites';
import { soundManager } from '../audio/soundManager';

interface WeddingCanvasProps {
  character: CharacterType;
  partner: CharacterType;
  isPaused: boolean;
  gameState?: GameState;
  onUpdateStats: (update: {
    score?: number;
    coins?: number;
    laddus?: number;
    distance?: number;
    hearts?: number;
    shieldActive?: boolean;
    magnetActive?: boolean;
  }) => void;
  onGameOver: () => void;
  onWin: () => void;
}

export const WeddingCanvas: React.FC<WeddingCanvasProps> = ({
  character,
  partner,
  isPaused,
  gameState = 'playing',
  onUpdateStats,
  onGameOver,
  onWin,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game internal state held in refs for 60fps loop
  const stateRef = useRef({
    score: 0,
    coins: 0,
    laddus: 0,
    distance: 0,
    targetDistance: 500, // 500 meters to reach the mandap
    hearts: 3,
    speed: 3.4, // Smooth, accessible classic runner speed (reduced from 6.2)
    baseY: 0,
    frame: 0,
    mandapSpawned: false,
    mandapX: 99999, // When distance reaches target, mandap appears
    reachedMandap: false,
    isGameOver: false,
    isWon: false,
    hasTriggeredGameOver: false,
    hasTriggeredWin: false,
    mandapCelebrateTimer: 0,
    pillarScrollX: 0,
    carpetScrollX: 0,
    nextObstacleDist: 90, // Generous spacing giving player comfortable reaction time
    nextCollectibleDist: 35,
    cameraFlashTimer: 0,
  });

  const playerRef = useRef<Player>({
    x: 100,
    y: 0,
    width: 82,
    height: 108,
    vy: 0,
    isGrounded: true,
    isJumping: false,
    isSliding: false,
    slideTimer: 0,
    jumpCount: 0,
    maxJumps: 2,
    state: 'run',
    frame: 0,
    invincibleTimer: 0,
    shieldTimer: 0,
    magnetTimer: 0,
  });

  const obstaclesRef = useRef<Obstacle[]>([]);
  const collectiblesRef = useRef<Collectible[]>([]);
  const particlesRef = useRef<Particle[]>([]);

  // Preloaded real photos of the bride and groom for canvas rendering
  const groomImgRef = useRef<HTMLImageElement | null>(null);
  const brideImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const g = new Image();
    g.src = '/groom_avatar.png';
    g.onerror = () => {
      g.src = '/groom.jpg';
    };
    groomImgRef.current = g;

    const b = new Image();
    b.src = '/bride_avatar.png';
    b.onerror = () => {
      b.src = '/bride.jpg';
    };
    brideImgRef.current = b;
  }, []);

  // Jump trigger
  const handleJump = useCallback(() => {
    const p = playerRef.current;
    const s = stateRef.current;
    if (s.reachedMandap || s.isGameOver || s.isWon || isPaused || gameState === 'gameover' || gameState === 'won') return;

    if (p.isGrounded || p.jumpCount < p.maxJumps) {
      p.vy = -11.2; // Smooth, floaty jump arc
      p.isGrounded = false;
      p.isJumping = true;
      p.isSliding = false;
      p.slideTimer = 0;
      p.jumpCount++;
      p.state = 'jump';
      soundManager.playJump();

      // Golden jump dust particles
      for (let i = 0; i < 6; i++) {
        particlesRef.current.push({
          x: p.x + p.width * 0.4 + (Math.random() * 20 - 10),
          y: p.y + p.height,
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * 2 + 1,
          size: Math.random() * 4 + 3,
          color: '#fbbf24',
          type: 'sparkle',
          rotation: 0,
          rotationSpeed: 0.1,
          life: 20,
          maxLife: 20,
          alpha: 1,
        });
      }
    }
  }, [isPaused, gameState]);

  // Slide trigger
  const handleSlide = useCallback(() => {
    const p = playerRef.current;
    const s = stateRef.current;
    if (s.reachedMandap || s.isGameOver || s.isWon || isPaused || gameState === 'gameover' || gameState === 'won') return;

    if (p.isGrounded && !p.isSliding) {
      p.isSliding = true;
      p.slideTimer = 36; // slide frames
      p.state = 'slide';
      soundManager.playSlide();

      // Slide dust
      for (let i = 0; i < 8; i++) {
        particlesRef.current.push({
          x: p.x + Math.random() * 20,
          y: p.y + p.height - 4,
          vx: -(Math.random() * 4 + 2),
          vy: -(Math.random() * 1.5),
          size: Math.random() * 4 + 2,
          color: '#fef3c7',
          type: 'sparkle',
          rotation: 0,
          rotationSpeed: 0.05,
          life: 18,
          maxLife: 18,
          alpha: 0.8,
        });
      }
    }
  }, [isPaused, gameState]);

  // Keyboard controls listener
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') {
        e.preventDefault();
        handleJump();
      } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        e.preventDefault();
        handleSlide();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleJump, handleSlide]);

  // Expose jump/slide via custom window events for on-screen touch buttons
  useEffect(() => {
    const onJumpEvent = () => handleJump();
    const onSlideEvent = () => handleSlide();

    window.addEventListener('game-action-jump', onJumpEvent);
    window.addEventListener('game-action-slide', onSlideEvent);

    return () => {
      window.removeEventListener('game-action-jump', onJumpEvent);
      window.removeEventListener('game-action-slide', onSlideEvent);
    };
  }, [handleJump, handleSlide]);

  // Main Canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
      stateRef.current.baseY = height - 120; // ground floor line
      if (playerRef.current.isGrounded) {
        playerRef.current.y = stateRef.current.baseY - playerRef.current.height;
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const loop = () => {
      const state = stateRef.current;
      const player = playerRef.current;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const groundY = state.baseY;

      const isGameOver = state.isGameOver || gameState === 'gameover';

      if (!isPaused && !isGameOver) {
        state.frame++;
        player.frame++;

        // Smooth, accessible speed progression (3.4 to 4.4 px/frame max)
        if (state.distance < state.targetDistance && !state.mandapSpawned) {
          state.speed = 3.4 + (state.distance / state.targetDistance) * 1.0;
        } else if (state.reachedMandap) {
          state.speed = 0; // World is stopped on stage!
        }

        // Advance smooth scrolling positions
        state.pillarScrollX += state.speed * 0.3;
        state.carpetScrollX += state.speed;

        // --- Distance & Mandap Goal Progress ---
        if (!state.reachedMandap) {
          state.distance += state.speed * 0.032; // Comfortable progress
          state.score += Math.floor(state.speed * 0.08);

          onUpdateStats({
            distance: Math.min(state.targetDistance, Math.floor(state.distance)),
            score: state.score,
          });

          // Destination reached: spawn mandap stage!
          if (state.distance >= state.targetDistance && !state.mandapSpawned) {
            state.mandapSpawned = true;
            state.mandapX = width + 40;
            // Clear any obstacles ahead so the stage entrance is grand and clear
            obstaclesRef.current = obstaclesRef.current.filter((o) => o.x < player.x);
          }
        }

        // --- Camera Flash Strobe Timer ---
        if (state.cameraFlashTimer > 0) {
          state.cameraFlashTimer--;
        }

        // --- Player Physics ---
        if (player.invincibleTimer > 0) player.invincibleTimer--;
        if (player.shieldTimer > 0) {
          player.shieldTimer--;
          if (player.shieldTimer === 0) onUpdateStats({ shieldActive: false });
        }
        if (player.magnetTimer > 0) {
          player.magnetTimer--;
          if (player.magnetTimer === 0) onUpdateStats({ magnetActive: false });
        }

        if (player.isSliding) {
          player.slideTimer--;
          player.height = 68; // lower profile during slide
          if (player.slideTimer <= 0) {
            player.isSliding = false;
            player.height = 108;
            player.state = 'run';
          }
        }

        if (!player.isGrounded) {
          player.vy += 0.48; // Gentle, floaty gravity (was 0.78)
          player.y += player.vy;

          if (player.y >= groundY - player.height) {
            player.y = groundY - player.height;
            player.vy = 0;
            player.isGrounded = true;
            player.isJumping = false;
            player.jumpCount = 0;
            if (!player.isSliding) {
              player.state = 'run';
            }
          }
        } else {
          player.y = groundY - player.height;
        }

        // --- Mandap Arrival & Reunion on Stage ---
        if (state.mandapSpawned) {
          // Scroll mandap onto stage until positioned nicely on right half
          if (state.mandapX > width * 0.42) {
            state.mandapX -= state.speed > 0 ? state.speed * 0.85 : 2.5;
          }

          // Player smoothly walks onto stage to meet partner!
          const stageTargetX = state.mandapX + 130;
          if (player.x < stageTargetX) {
            player.x += 2.4;
            player.state = 'run';
          } else if (!state.reachedMandap) {
            state.reachedMandap = true;
            state.isWon = true;
            state.speed = 0; // World stops scrolling!
            player.x = stageTargetX;
            player.state = 'celebrate';
            soundManager.playWin();

            // Transition to wedding invitation and countdown screen once
            if (!state.hasTriggeredWin) {
              state.hasTriggeredWin = true;
              setTimeout(() => {
                onWin();
              }, 1400);
            }
          }
        }

        // Continuous celebratory rose petal showers on stage reunion
        if (state.reachedMandap && state.frame % 3 === 0 && particlesRef.current.length < 50) {
          particlesRef.current.push({
            x: player.x + (Math.random() * 140 - 50),
            y: groundY - 260 + Math.random() * 30,
            vx: (Math.random() - 0.5) * 1.5,
            vy: Math.random() * 1.8 + 1.2,
            size: Math.random() * 4 + 4,
            color: Math.random() > 0.4 ? '#f43f5e' : '#fbbf24',
            type: 'petal',
            rotation: Math.random() * Math.PI,
            rotationSpeed: (Math.random() - 0.5) * 0.08,
            life: 140,
            maxLife: 140,
            alpha: 1,
          });
        }

        // --- Spawn Obstacles (Only while running, never after reaching destination) ---
        if (!state.mandapSpawned && state.distance < state.targetDistance) {
          state.nextObstacleDist -= state.speed * 0.15;
          if (state.nextObstacleDist <= 0) {
            const types: ObstacleType[] = [
              'aunties',
              'musician',
              'photographer',
              'shorter_pot',
              'pot_stack',
              'marigold_barrier',
              'bridal_doli',
            ];
            const chosen = types[Math.floor(Math.random() * types.length)];

            let obsW = 85;
            let obsH = 95;
            let obsY = groundY - obsH;
            let requiresSlide = false;
            let requiresJump = true;

            if (chosen === 'aunties') {
              obsW = 90;
              obsH = 95;
              obsY = groundY - obsH;
            } else if (chosen === 'musician') {
              obsW = 80;
              obsH = 95;
              obsY = groundY - obsH;
            } else if (chosen === 'photographer') {
              obsW = 90;
              obsH = 80;
              obsY = groundY - obsH;
            } else if (chosen === 'shorter_pot') {
              obsW = 75;
              obsH = 65;
              obsY = groundY - obsH;
            } else if (chosen === 'pot_stack') {
              obsW = 65;
              obsH = 95;
              obsY = groundY - obsH;
            } else if (chosen === 'marigold_barrier') {
              // High hanging garland barrier - player must SLIDE under!
              obsW = 100;
              obsH = 120;
              obsY = groundY - obsH;
              requiresSlide = true;
            } else if (chosen === 'bridal_doli') {
              obsW = 110;
              obsH = 105;
              obsY = groundY - obsH;
            }

            obstaclesRef.current.push({
              id: Date.now() + Math.random(),
              x: width + 50,
              y: obsY,
              width: obsW,
              height: obsH,
              type: chosen,
              requiresSlide,
              requiresJump,
              flashTimer: chosen === 'photographer' ? 18 : 0,
            });

            // Trigger photographer flash effect sound and screen burst
            if (chosen === 'photographer') {
              soundManager.playCameraFlash();
              state.cameraFlashTimer = 14;
            }

            // Next distance spacing
            state.nextObstacleDist = 80 + Math.random() * 50;
          }

          // --- Spawn Collectibles ---
          state.nextCollectibleDist -= state.speed * 0.15;
          if (state.nextCollectibleDist <= 0) {
            const rand = Math.random();
            let cType: CollectibleType = 'coin';
            if (rand > 0.88) cType = 'garland'; // Varmala power-up
            else if (rand > 0.78) cType = 'kalash'; // Shield
            else if (rand > 0.6) cType = 'laddu'; // Sweet Laddu

            const cW = 38;
            const cH = 38;
            // Float higher if arc jump
            const arcJump = Math.random() > 0.45;
            const cY = arcJump ? groundY - 130 - Math.random() * 40 : groundY - 60;

            collectiblesRef.current.push({
              id: Date.now() + Math.random(),
              x: width + 40,
              y: cY,
              width: cW,
              height: cH,
              type: cType,
              floatingOffset: Math.random() * Math.PI * 2,
            });

            // Group coins in trails of 3
            if (cType === 'coin' && Math.random() > 0.4) {
              for (let ci = 1; ci <= 2; ci++) {
                collectiblesRef.current.push({
                  id: Date.now() + Math.random() + ci,
                  x: width + 40 + ci * 48,
                  y: cY - (ci === 1 && arcJump ? 20 : 0),
                  width: cW,
                  height: cH,
                  type: 'coin',
                  floatingOffset: Math.random() * Math.PI * 2,
                });
              }
            }

            state.nextCollectibleDist = 32 + Math.random() * 25;
          }
        }

        // --- Move Obstacles ---
        for (let i = obstaclesRef.current.length - 1; i >= 0; i--) {
          const obs = obstaclesRef.current[i];
          obs.x -= state.speed;

          if (obs.flashTimer && obs.flashTimer > 0) obs.flashTimer--;

          // Collision detection with player
          if (!obs.hit && !state.reachedMandap) {
            // Player hitbox
            const pBox = {
              x: player.x + 15,
              y: player.y + (player.isSliding ? 15 : 10),
              w: player.width - 30,
              h: player.height - (player.isSliding ? 20 : 15),
            };

            // Obstacle hitbox (forgiving)
            let oBox = {
              x: obs.x + 12,
              y: obs.y + 10,
              w: obs.width - 24,
              h: obs.height - 15,
            };

            // For hanging barrier, if sliding under, no hit!
            if (obs.type === 'marigold_barrier' && player.isSliding) {
              oBox.h = 0; // successfully slided under!
            }

            const collides =
              pBox.x < oBox.x + oBox.w &&
              pBox.x + pBox.w > oBox.x &&
              pBox.y < oBox.y + oBox.h &&
              pBox.y + pBox.h > oBox.y;

            if (collides) {
              obs.hit = true;

              // Check shield / invincibility
              if (player.shieldTimer > 0 || player.invincibleTimer > 0) {
                // Smashing obstacle with golden burst
                for (let k = 0; k < 12; k++) {
                  particlesRef.current.push({
                    x: obs.x + obs.width / 2,
                    y: obs.y + obs.height / 2,
                    vx: (Math.random() - 0.5) * 8,
                    vy: (Math.random() - 0.5) * 8,
                    size: Math.random() * 5 + 4,
                    color: '#fbbf24',
                    type: 'star',
                    rotation: 0,
                    rotationSpeed: 0.15,
                    life: 25,
                    maxLife: 25,
                    alpha: 1,
                  });
                }
              } else {
                // Hit player!
                soundManager.playHit();
                state.hearts--;
                player.invincibleTimer = 55; // invincibility blink frames
                player.state = 'hit';

                onUpdateStats({ hearts: Math.max(0, state.hearts) });

                // Red hit flash particles
                for (let k = 0; k < 10; k++) {
                  particlesRef.current.push({
                    x: player.x + player.width / 2,
                    y: player.y + player.height / 2,
                    vx: (Math.random() - 0.5) * 6,
                    vy: (Math.random() - 0.5) * 6,
                    size: Math.random() * 5 + 3,
                    color: '#ef4444',
                    type: 'sparkle',
                    rotation: 0,
                    rotationSpeed: 0.2,
                    life: 22,
                    maxLife: 22,
                    alpha: 1,
                  });
                }

                if (state.hearts <= 0) {
                  state.isGameOver = true;
                  state.speed = 0; // Immediately stop world scroll!
                  player.state = 'hit';
                  player.vy = 0;
                  if (!state.hasTriggeredGameOver) {
                    state.hasTriggeredGameOver = true;
                    onGameOver();
                  }
                } else {
                  setTimeout(() => {
                    if (player.state === 'hit' && !state.isGameOver) {
                      player.state = 'run';
                    }
                  }, 280);
                }
              }
            }
          }

          if (obs.x < -150) {
            obstaclesRef.current.splice(i, 1);
          }
        }

        // --- Move & Magnet Collectibles ---
        for (let j = collectiblesRef.current.length - 1; j >= 0; j--) {
          const col = collectiblesRef.current[j];
          col.x -= state.speed;

          // Magnet Power-up logic (Garland attraction)
          if (player.magnetTimer > 0) {
            const dx = player.x + player.width / 2 - (col.x + col.width / 2);
            const dy = player.y + player.height / 2 - (col.y + col.height / 2);
            const dist = Math.hypot(dx, dy);
            if (dist < 260) {
              col.x += (dx / dist) * 11;
              col.y += (dy / dist) * 11;
            }
          }

          // Collection check
          const distToPlayer = Math.hypot(
            player.x + player.width / 2 - (col.x + col.width / 2),
            player.y + player.height / 2 - (col.y + col.height / 2)
          );

          if (distToPlayer < 45 && !col.collected) {
            col.collected = true;

            if (col.type === 'coin') {
              soundManager.playCoin();
              state.coins++;
              state.score += 20;
              onUpdateStats({ coins: state.coins, score: state.score });
            } else if (col.type === 'laddu') {
              soundManager.playLaddu();
              state.laddus++;
              state.score += 50;
              // Eating laddu restores a heart if lost!
              if (state.hearts < 3) {
                state.hearts++;
                onUpdateStats({ hearts: state.hearts });
              }
              onUpdateStats({ laddus: state.laddus, score: state.score });
            } else if (col.type === 'kalash') {
              soundManager.playKalash();
              player.shieldTimer = 380; // ~6.5 seconds of divine shield
              state.score += 100;
              onUpdateStats({ shieldActive: true, score: state.score });
            } else if (col.type === 'garland') {
              soundManager.playGarland();
              player.magnetTimer = 440; // ~7.5 seconds of garland attraction
              state.score += 150;
              onUpdateStats({ magnetActive: true, score: state.score });
            }

            // Collect burst particles
            const pColor =
              col.type === 'coin'
                ? '#f59e0b'
                : col.type === 'laddu'
                ? '#f97316'
                : col.type === 'kalash'
                ? '#38bdf8'
                : '#f43f5e';

            for (let k = 0; k < 8; k++) {
              particlesRef.current.push({
                x: col.x + col.width / 2,
                y: col.y + col.height / 2,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                size: Math.random() * 4 + 3,
                color: pColor,
                type: 'sparkle',
                rotation: 0,
                rotationSpeed: 0.1,
                life: 18,
                maxLife: 18,
                alpha: 1,
              });
            }

            collectiblesRef.current.splice(j, 1);
            continue;
          }

          if (col.x < -100) {
            collectiblesRef.current.splice(j, 1);
          }
        }

        // --- DRAWING PASS ---
        ctx.clearRect(0, 0, width, height);

        // 1. Festive Wedding Hall Background (Sky & Glow)
        const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
        skyGrad.addColorStop(0, '#450a0a'); // deep royal maroon
        skyGrad.addColorStop(0.5, '#78350f'); // warm amber glow
        skyGrad.addColorStop(1, '#991b1b'); // festive red
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, width, height);

        // Fairy light strings arching in sky
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 1.5;
        for (let st = 0; st < 3; st++) {
          const sy = 40 + st * 45;
          ctx.beginPath();
          ctx.moveTo(0, sy);
          ctx.quadraticCurveTo(width / 2, sy + 30, width, sy);
          ctx.stroke();

          // Fairy bulbs
          for (let b = 0; b < 12; b++) {
            const bx = (b / 11) * width;
            const by = sy + Math.sin((b / 11) * Math.PI) * 30;
            const glow = Math.sin(state.frame * 0.1 + b + st) * 0.3 + 0.7;
            ctx.fillStyle = `rgba(254, 240, 138, ${glow})`;
            ctx.beginPath();
            ctx.arc(bx, by + 4, 3.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // 2. Parallax Mandap Temple Pillars in Background
        const pillarSpacing = 280;
        const pillarOffset = state.pillarScrollX % pillarSpacing;
        for (let px = -pillarSpacing; px < width + pillarSpacing; px += pillarSpacing) {
          const currentPx = px - pillarOffset;
          // Pillar
          ctx.fillStyle = 'rgba(245, 158, 11, 0.25)';
          ctx.fillRect(currentPx, groundY - 260, 28, 260);
          ctx.strokeStyle = 'rgba(254, 240, 138, 0.4)';
          ctx.strokeRect(currentPx, groundY - 260, 28, 260);

          // Auspicious Nilavilakku Brass Lamp atop pillar
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath();
          ctx.arc(currentPx + 14, groundY - 264, 7, 0, Math.PI);
          ctx.fill();
          // Animated lamp flame
          const flameFlicker = Math.sin(state.frame * 0.2 + px) * 2;
          ctx.fillStyle = '#fde047';
          ctx.beginPath();
          ctx.ellipse(currentPx + 14, groundY - 272 + flameFlicker, 3.5, 6, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#f97316';
          ctx.beginPath();
          ctx.ellipse(currentPx + 14, groundY - 270 + flameFlicker, 2, 3.5, 0, 0, Math.PI * 2);
          ctx.fill();

          // Hanging marigold garland between pillars
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(currentPx + 14, groundY - 220);
          ctx.quadraticCurveTo(currentPx + pillarSpacing / 2, groundY - 180, currentPx + pillarSpacing + 14, groundY - 220);
          ctx.stroke();
        }

        // 3. Ground / Wedding Red Carpet Runway
        // Red velvet carpet
        const carpetGrad = ctx.createLinearGradient(0, groundY, 0, height);
        carpetGrad.addColorStop(0, '#991b1b');
        carpetGrad.addColorStop(0.3, '#7f1d1d');
        carpetGrad.addColorStop(1, '#450a0a');
        ctx.fillStyle = carpetGrad;
        ctx.fillRect(0, groundY, width, height - groundY);

        // Gold Zari trim on carpet edge
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(0, groundY - 6, width, 8);
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(0, groundY - 3, width, 2);

        // Scrolling Rangoli / Floral patterns on carpet
        const rangoliSpacing = 160;
        const rangoliOffset = state.carpetScrollX % rangoliSpacing;
        for (let rx = -rangoliSpacing; rx < width + rangoliSpacing; rx += rangoliSpacing) {
          const patternX = rx - rangoliOffset;
          ctx.fillStyle = 'rgba(254, 240, 138, 0.35)';
          // Kolam / Rangoli flower motif
          ctx.beginPath();
          ctx.arc(patternX, groundY + 28, 12, 0, Math.PI * 2);
          ctx.fill();
          for (let p = 0; p < 6; p++) {
            const pa = (p / 6) * Math.PI * 2;
            ctx.beginPath();
            ctx.arc(patternX + Math.cos(pa) * 16, groundY + 28 + Math.sin(pa) * 8, 5, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // 4. Draw Mandap if reached or approaching
        if (state.mandapX <= width) {
          SpriteRenderer.drawWeddingMandap(ctx, state.mandapX, groundY - 260, 360, 260, partner, state.frame);

          // Draw Partner Real Photo Cameo above the Mandap
          const partnerImg = partner === 'vishnu' ? groomImgRef.current : brideImgRef.current;
          if (partnerImg && partnerImg.complete && partnerImg.naturalWidth > 0) {
            ctx.save();
            const pX = state.mandapX + 180;
            const pY = groundY - 170;
            const pR = 24;
            // Golden halo ring
            ctx.beginPath();
            ctx.arc(pX, pY, pR + 4, 0, Math.PI * 2);
            ctx.fillStyle = '#fde047';
            ctx.shadowColor = '#f59e0b';
            ctx.shadowBlur = 14;
            ctx.fill();
            // Photo clip
            ctx.save();
            ctx.beginPath();
            ctx.arc(pX, pY, pR, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(partnerImg, pX - pR, pY - pR, pR * 2, pR * 2);
            ctx.restore();
            // Golden border stroke
            ctx.strokeStyle = '#c59b27';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(pX, pY, pR, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }
        }

        // 5. Draw Obstacles
        for (const obs of obstaclesRef.current) {
          if (obs.type === 'aunties') {
            SpriteRenderer.drawAunties(ctx, obs.x, obs.y, obs.width, obs.height, state.frame);
          } else if (obs.type === 'musician') {
            SpriteRenderer.drawMusician(ctx, obs.x, obs.y, obs.width, obs.height, state.frame);
          } else if (obs.type === 'photographer') {
            SpriteRenderer.drawPhotographers(ctx, obs.x, obs.y, obs.width, obs.height, obs.flashTimer || 0);
          } else if (obs.type === 'shorter_pot') {
            SpriteRenderer.drawShorterPot(ctx, obs.x, obs.y, obs.width, obs.height);
          } else if (obs.type === 'pot_stack') {
            SpriteRenderer.drawPotStack(ctx, obs.x, obs.y, obs.width, obs.height);
          } else if (obs.type === 'marigold_barrier') {
            SpriteRenderer.drawMarigoldBarrier(ctx, obs.x, obs.y, obs.width, obs.height, state.frame);
          } else if (obs.type === 'bridal_doli') {
            SpriteRenderer.drawBridalDoli(ctx, obs.x, obs.y, obs.width, obs.height);
          }
        }

        // 6. Draw Collectibles
        for (const col of collectiblesRef.current) {
          const floatY = col.y + Math.sin(state.frame * 0.1 + (col.floatingOffset || 0)) * 5;
          if (col.type === 'coin') {
            SpriteRenderer.drawCoin(ctx, col.x, floatY, col.width, col.height, state.frame);
          } else if (col.type === 'laddu') {
            SpriteRenderer.drawLaddu(ctx, col.x, floatY, col.width, col.height);
          } else if (col.type === 'kalash') {
            SpriteRenderer.drawKalash(ctx, col.x, floatY, col.width, col.height, state.frame);
          } else if (col.type === 'garland') {
            SpriteRenderer.drawGarland(ctx, col.x, floatY, col.width, col.height, state.frame);
          }
        }

        // 7. Draw Player Character (Vishnu or Akshitha)
        // If blinking from hit, alternate visibility
        const isBlinking = player.invincibleTimer > 0 && Math.floor(player.invincibleTimer / 4) % 2 === 0;
        if (!isBlinking) {
          if (character === 'vishnu') {
            SpriteRenderer.drawVishnu(
              ctx,
              player.x,
              player.y,
              player.width,
              player.height,
              player.state,
              player.frame,
              player.shieldTimer > 0
            );
          } else {
            SpriteRenderer.drawAkshitha(
              ctx,
              player.x,
              player.y,
              player.width,
              player.height,
              player.state,
              player.frame,
              player.shieldTimer > 0
            );
          }

          // Real photo cameo badge on player runner
          const playerImg = character === 'vishnu' ? groomImgRef.current : brideImgRef.current;
          if (playerImg && playerImg.complete && playerImg.naturalWidth > 0) {
            ctx.save();
            const cameoR = 17;
            const cameoX = player.x + player.width * 0.48;
            const cameoY = player.isSliding ? player.y + 18 : player.y - 14;
            // Golden medal rim
            ctx.beginPath();
            ctx.arc(cameoX, cameoY, cameoR + 3, 0, Math.PI * 2);
            ctx.fillStyle = '#fde047';
            ctx.shadowColor = '#d97706';
            ctx.shadowBlur = 8;
            ctx.fill();
            // Clip photo
            ctx.save();
            ctx.beginPath();
            ctx.arc(cameoX, cameoY, cameoR, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(playerImg, cameoX - cameoR, cameoY - cameoR, cameoR * 2, cameoR * 2);
            ctx.restore();
            // Gold border
            ctx.strokeStyle = '#c59b27';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(cameoX, cameoY, cameoR, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }
        }

        // 8. Update & Draw Particles (Rose petals, sparkles, confetti)
        for (let pIdx = particlesRef.current.length - 1; pIdx >= 0; pIdx--) {
          const pt = particlesRef.current[pIdx];
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.life--;
          pt.alpha = pt.life / pt.maxLife;
          pt.rotation += pt.rotationSpeed;

          ctx.save();
          ctx.translate(pt.x, pt.y);
          ctx.rotate(pt.rotation);
          ctx.globalAlpha = Math.max(0, pt.alpha);

          if (pt.type === 'petal') {
            ctx.fillStyle = pt.color;
            ctx.beginPath();
            ctx.ellipse(0, 0, pt.size * 1.4, pt.size * 0.8, 0, 0, Math.PI * 2);
            ctx.fill();
          } else if (pt.type === 'sparkle') {
            ctx.fillStyle = pt.color;
            ctx.beginPath();
            ctx.arc(0, 0, pt.size, 0, Math.PI * 2);
            ctx.fill();
          } else if (pt.type === 'star') {
            ctx.fillStyle = pt.color;
            ctx.beginPath();
            for (let s = 0; s < 5; s++) {
              const sa = (s * Math.PI * 2) / 5;
              const sx = Math.cos(sa) * pt.size;
              const sy = Math.sin(sa) * pt.size;
              if (s === 0) ctx.moveTo(sx, sy);
              else ctx.lineTo(sx, sy);
            }
            ctx.closePath();
            ctx.fill();
          }

          ctx.restore();

          if (pt.life <= 0 || pt.y > height + 20) {
            particlesRef.current.splice(pIdx, 1);
          }
        }

        // 9. Camera Flash Screen Flash Burst
        if (state.cameraFlashTimer > 0) {
          const flashAlpha = (state.cameraFlashTimer / 14) * 0.55;
          ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha})`;
          ctx.fillRect(0, 0, width, height);
        }

        // 10. Defeat darken vignette if Game Over
        if (isGameOver) {
          ctx.save();
          ctx.fillStyle = 'rgba(15, 2, 4, 0.4)';
          ctx.fillRect(0, 0, width, height);
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [character, partner, isPaused, gameState, onGameOver, onWin, onUpdateStats]);

  return (
    <div className="relative w-full h-full select-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-pointer"
        onClick={handleJump}
      />
    </div>
  );
};
