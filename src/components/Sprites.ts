// Canvas 2D Vector Sprites & Artwork based on Indian Wedding Assets

import { CharacterType, ObstacleType, CollectibleType } from '../types';

export class SpriteRenderer {
  // --- Character: VISHNU (THE GROOM) ---
  public static drawVishnu(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    state: 'run' | 'jump' | 'slide' | 'celebrate' | 'hit',
    frame: number,
    hasShield: boolean = false
  ) {
    ctx.save();
    ctx.translate(x, y);

    // Shield aura
    if (hasShield) {
      ctx.save();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.ellipse(width / 2, height / 2, width * 0.65, height * 0.58, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    const runCycle = Math.sin(frame * 0.15);
    const legCycle = Math.sin(frame * 0.15);

    if (state === 'slide') {
      // Sliding pose: low posture, body leaned back, dhoti sliding forward
      ctx.translate(0, height * 0.35);
      this.drawVishnuBody(ctx, width, height * 0.65, -0.4, 0.6, 0.4, -0.6);
    } else if (state === 'jump') {
      // Jump pose: leaping forward, back leg kicked out, front leg tucked
      this.drawVishnuBody(ctx, width, height, 0.15, -0.6, 0.8, -0.8);
    } else if (state === 'celebrate') {
      // Celebrate: arms high in the air, joyous smile
      this.drawVishnuCelebrate(ctx, width, height, frame);
    } else if (state === 'hit') {
      // Hit pose: recoiling slightly
      ctx.translate(runCycle * 4, 0);
      this.drawVishnuBody(ctx, width, height, -0.2, legCycle * 0.3, -legCycle * 0.3, 0);
    } else {
      // Run pose
      const bob = Math.abs(Math.sin(frame * 0.15)) * 3.5;
      ctx.translate(0, -bob);
      this.drawVishnuBody(ctx, width, height, 0.1, legCycle * 0.75, -legCycle * 0.75, runCycle * 0.6);
    }

    ctx.restore();
  }

  private static drawVishnuBody(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    leanAngle: number,
    leftLegAngle: number,
    rightLegAngle: number,
    armSwing: number
  ) {
    ctx.save();
    ctx.translate(w * 0.45, h * 0.5);
    ctx.rotate(leanAngle);

    // Back leg (Right leg)
    ctx.save();
    ctx.translate(w * 0.05, h * 0.08);
    ctx.rotate(rightLegAngle);
    // Pleated cream dhoti with gold border
    ctx.fillStyle = '#fdf8ee';
    ctx.beginPath();
    ctx.roundRect(-w * 0.1, 0, w * 0.22, h * 0.36, 6);
    ctx.fill();
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 3;
    ctx.stroke();
    // Gold zari border at hem
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-w * 0.1, h * 0.32, w * 0.22, h * 0.04);
    // Gold Mojari / Jutti shoe
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.ellipse(w * 0.02, h * 0.37, w * 0.14, h * 0.06, 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Floating Dupatta/Scarf (Angavastram) trailing behind
    ctx.save();
    ctx.strokeStyle = '#fef3c7';
    ctx.lineWidth = w * 0.12;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-w * 0.1, -h * 0.18);
    ctx.quadraticCurveTo(-w * 0.45, -h * 0.05 + armSwing * 8, -w * 0.65, -h * 0.12);
    ctx.stroke();
    // Gold border on scarf
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.restore();

    // Front leg (Left leg)
    ctx.save();
    ctx.translate(-w * 0.05, h * 0.08);
    ctx.rotate(leftLegAngle);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(-w * 0.11, 0, w * 0.24, h * 0.37, 7);
    ctx.fill();
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 3;
    ctx.stroke();
    // Gold zari border
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-w * 0.11, h * 0.33, w * 0.24, h * 0.04);
    // Gold Jutti shoe
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.ellipse(w * 0.03, h * 0.38, w * 0.15, h * 0.065, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Torso / Sherwani (Golden brocade ivory sherwani)
    ctx.save();
    ctx.translate(0, -h * 0.22);
    // Sherwani base
    const sherwaniGrad = ctx.createLinearGradient(-w * 0.2, 0, w * 0.2, h * 0.35);
    sherwaniGrad.addColorStop(0, '#fef08a');
    sherwaniGrad.addColorStop(0.5, '#fde047');
    sherwaniGrad.addColorStop(1, '#eab308');
    ctx.fillStyle = sherwaniGrad;
    ctx.beginPath();
    ctx.roundRect(-w * 0.18, 0, w * 0.36, h * 0.34, [8, 8, 4, 4]);
    ctx.fill();
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Brocade button placket & buttons
    ctx.fillStyle = '#b45309';
    ctx.fillRect(-w * 0.02, h * 0.04, w * 0.04, h * 0.26);
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(0, h * (0.07 + i * 0.065), 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Grand Varmala (Red Rose & Jasmine Wedding Garland)
    ctx.save();
    ctx.lineWidth = w * 0.07;
    // Garland loop 1
    for (let g = 0; g < 7; g++) {
      const angle = (g / 6) * Math.PI;
      const gx = Math.cos(angle) * (w * 0.14);
      const gy = Math.sin(angle) * (h * 0.22) + h * 0.05;
      // Alternate red rose & white jasmine
      ctx.fillStyle = g % 2 === 0 ? '#dc2626' : '#ffffff';
      ctx.beginPath();
      ctx.arc(gx, gy, w * 0.045, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#15803d';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    // Garland center floral pendant
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(0, h * 0.28, w * 0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Arms
    // Left arm (front)
    ctx.save();
    ctx.translate(w * 0.14, h * 0.05);
    ctx.rotate(-armSwing * 0.8 + 0.3);
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.roundRect(-w * 0.06, 0, w * 0.12, h * 0.22, 6);
    ctx.fill();
    // Gold bracelet/kada
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-w * 0.06, h * 0.17, w * 0.12, h * 0.025);
    // Hand - natural, even South Indian warm complexion
    ctx.fillStyle = '#ce8252';
    ctx.beginPath();
    ctx.arc(0, h * 0.23, w * 0.055, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Head & Face
    ctx.save();
    ctx.translate(w * 0.02, -h * 0.15);

    // Neck - natural contour shadow matching skin tone
    ctx.fillStyle = '#b86a3e';
    ctx.fillRect(-w * 0.06, h * 0.08, w * 0.12, h * 0.06);

    // Head base - radiant even warm complexion
    ctx.fillStyle = '#ce8252';
    ctx.beginPath();
    ctx.ellipse(0, 0, w * 0.16, h * 0.13, 0, 0, Math.PI * 2);
    ctx.fill();

    // Handsome trimmed beard / stubble
    ctx.fillStyle = '#3e2723';
    ctx.beginPath();
    ctx.ellipse(0, h * 0.04, w * 0.13, h * 0.07, 0, 0, Math.PI);
    ctx.fill();

    // Smiling mouth with white teeth
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(w * 0.03, h * 0.035, w * 0.05, 0, Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#881337';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Eyes (Expressive, sparkling groom eyes)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(w * 0.05, -h * 0.02, w * 0.045, h * 0.025, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.arc(w * 0.065, -h * 0.02, w * 0.022, 0, Math.PI * 2);
    ctx.fill();
    // Catchlight in eye
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(w * 0.075, -h * 0.025, 1.8, 0, Math.PI * 2);
    ctx.fill();

    // Eyebrows
    ctx.strokeStyle = '#1c1917';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(w * 0.01, -h * 0.05);
    ctx.quadraticCurveTo(w * 0.06, -h * 0.065, w * 0.11, -h * 0.045);
    ctx.stroke();

    // Stylized wavy dark groom hair (voluminous pompadour)
    ctx.fillStyle = '#261b18';
    ctx.beginPath();
    ctx.moveTo(-w * 0.16, -h * 0.04);
    ctx.quadraticCurveTo(-w * 0.18, -h * 0.17, -w * 0.05, -h * 0.19);
    ctx.quadraticCurveTo(w * 0.12, -h * 0.22, w * 0.18, -h * 0.14);
    ctx.quadraticCurveTo(w * 0.18, -h * 0.05, w * 0.12, -h * 0.02);
    ctx.quadraticCurveTo(w * 0.05, -h * 0.11, -w * 0.08, -h * 0.08);
    ctx.closePath();
    ctx.fill();

    ctx.restore(); // Head
    ctx.restore(); // Torso
    ctx.restore(); // Base
  }

  private static drawVishnuCelebrate(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    frame: number
  ) {
    ctx.save();
    ctx.translate(w * 0.5, h * 0.5);

    // Legs standing firm
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-w * 0.15, h * 0.05, w * 0.14, h * 0.38);
    ctx.fillRect(w * 0.01, h * 0.05, w * 0.14, h * 0.38);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-w * 0.15, h * 0.38, w * 0.14, h * 0.04);
    ctx.fillRect(w * 0.01, h * 0.38, w * 0.14, h * 0.04);

    // Gold Shoes
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.ellipse(-w * 0.08, h * 0.43, w * 0.1, h * 0.05, 0, 0, Math.PI * 2);
    ctx.ellipse(w * 0.08, h * 0.43, w * 0.1, h * 0.05, 0, 0, Math.PI * 2);
    ctx.fill();

    // Torso
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.roundRect(-w * 0.18, -h * 0.22, w * 0.36, h * 0.32, 8);
    ctx.fill();
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Varmala Garland
    ctx.lineWidth = w * 0.08;
    for (let g = 0; g < 7; g++) {
      const angle = (g / 6) * Math.PI;
      const gx = Math.cos(angle) * (w * 0.13);
      const gy = Math.sin(angle) * (h * 0.2) - h * 0.15;
      ctx.fillStyle = g % 2 === 0 ? '#dc2626' : '#ffffff';
      ctx.beginPath();
      ctx.arc(gx, gy, w * 0.045, 0, Math.PI * 2);
      ctx.fill();
    }

    // Both arms raised high throwing flowers!
    ctx.fillStyle = '#fde047';
    // Left arm raised
    ctx.save();
    ctx.translate(-w * 0.15, -h * 0.16);
    ctx.rotate(-0.85);
    ctx.fillRect(0, 0, w * 0.1, h * 0.26);
    ctx.fillStyle = '#ce8252';
    ctx.beginPath();
    ctx.arc(w * 0.05, h * 0.28, w * 0.055, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Right arm raised
    ctx.save();
    ctx.translate(w * 0.15, -h * 0.16);
    ctx.rotate(0.85);
    ctx.fillStyle = '#fde047';
    ctx.fillRect(-w * 0.1, 0, w * 0.1, h * 0.26);
    ctx.fillStyle = '#ce8252';
    ctx.beginPath();
    ctx.arc(-w * 0.05, h * 0.28, w * 0.055, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Head with huge joyful smile - even warm complexion
    ctx.fillStyle = '#ce8252';
    ctx.beginPath();
    ctx.ellipse(0, -h * 0.3, w * 0.16, h * 0.13, 0, 0, Math.PI * 2);
    ctx.fill();

    // Big happy smile
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, -h * 0.27, w * 0.07, 0, Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#881337';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Joyful closed curved eyes (happy anime style)
    ctx.strokeStyle = '#1c1917';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(-w * 0.06, -h * 0.32, w * 0.035, Math.PI, 0);
    ctx.arc(w * 0.06, -h * 0.32, w * 0.035, Math.PI, 0);
    ctx.stroke();

    // Hair
    ctx.fillStyle = '#261b18';
    ctx.beginPath();
    ctx.arc(0, -h * 0.37, w * 0.16, Math.PI, 0);
    ctx.fill();

    // Floating rose petals scattered above hands
    for (let p = 0; p < 8; p++) {
      const px = Math.sin(frame * 0.1 + p * 1.2) * (w * 0.45);
      const py = -h * 0.48 - (p * 8) + (Math.cos(frame * 0.1 + p) * 10);
      ctx.fillStyle = p % 2 === 0 ? '#f43f5e' : '#facc15';
      ctx.beginPath();
      ctx.ellipse(px, py, 5, 3.5, p * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  // --- Character: AKSHITHA (THE BRIDE) ---
  public static drawAkshitha(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    state: 'run' | 'jump' | 'slide' | 'celebrate' | 'hit',
    frame: number,
    hasShield: boolean = false
  ) {
    ctx.save();
    ctx.translate(x, y);

    // Shield aura
    if (hasShield) {
      ctx.save();
      ctx.strokeStyle = '#ec4899';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#f43f5e';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.ellipse(width / 2, height / 2, width * 0.65, height * 0.58, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    const runCycle = Math.sin(frame * 0.15);
    const legCycle = Math.sin(frame * 0.15);

    if (state === 'slide') {
      ctx.translate(0, height * 0.32);
      this.drawAkshithaBody(ctx, width, height * 0.68, -0.35, 0.5, -0.4, 0.4);
    } else if (state === 'jump') {
      this.drawAkshithaBody(ctx, width, height, 0.12, -0.55, 0.75, -0.7);
    } else if (state === 'celebrate') {
      this.drawAkshithaCelebrate(ctx, width, height, frame);
    } else if (state === 'hit') {
      ctx.translate(runCycle * 4, 0);
      this.drawAkshithaBody(ctx, width, height, -0.2, legCycle * 0.3, -legCycle * 0.3, 0);
    } else {
      const bob = Math.abs(Math.sin(frame * 0.15)) * 3.5;
      ctx.translate(0, -bob);
      this.drawAkshithaBody(ctx, width, height, 0.08, legCycle * 0.7, -legCycle * 0.7, runCycle * 0.6);
    }

    ctx.restore();
  }

  private static drawAkshithaBody(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    leanAngle: number,
    leftLegAngle: number,
    rightLegAngle: number,
    armSwing: number
  ) {
    ctx.save();
    ctx.translate(w * 0.48, h * 0.5);
    ctx.rotate(leanAngle);

    // Long Braid with white jasmine flowers (Gajra / Mullappoo) trailing behind
    ctx.save();
    ctx.lineWidth = w * 0.08;
    ctx.strokeStyle = '#1c1917';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-w * 0.1, -h * 0.28);
    ctx.quadraticCurveTo(-w * 0.38, -h * 0.15 + armSwing * 6, -w * 0.48, h * 0.08);
    ctx.stroke();

    // Jasmine floral clusters along braid
    for (let j = 0; j < 5; j++) {
      const t = j / 4;
      const jx = -w * 0.1 * (1 - t) + -w * 0.45 * t;
      const jy = -h * 0.28 * (1 - t) + h * 0.05 * t;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(jx, jy, w * 0.045, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(jx, jy, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Saree Pallu (crimson and gold zari) flowing behind
    ctx.save();
    const palluGrad = ctx.createLinearGradient(-w * 0.4, 0, 0, h * 0.3);
    palluGrad.addColorStop(0, '#be123c');
    palluGrad.addColorStop(0.5, '#e11d48');
    palluGrad.addColorStop(1, '#f59e0b');
    ctx.fillStyle = palluGrad;
    ctx.beginPath();
    ctx.moveTo(-w * 0.05, -h * 0.12);
    ctx.quadraticCurveTo(-w * 0.42, -h * 0.02 + armSwing * 8, -w * 0.52, h * 0.22);
    ctx.lineTo(-w * 0.35, h * 0.25);
    ctx.quadraticCurveTo(-w * 0.2, h * 0.1, -w * 0.02, 0);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.restore();

    // Back leg & Saree Pleats
    ctx.save();
    ctx.translate(w * 0.02, h * 0.06);
    ctx.rotate(rightLegAngle);
    // Crimson Kanjeevaram Saree pleats
    ctx.fillStyle = '#be123c';
    ctx.beginPath();
    ctx.roundRect(-w * 0.12, 0, w * 0.24, h * 0.36, 8);
    ctx.fill();
    // Heavy gold zari border at hem
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-w * 0.12, h * 0.31, w * 0.24, h * 0.05);
    // Saree gold zari peacock motif line
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 2;
    ctx.strokeRect(-w * 0.12, h * 0.31, w * 0.24, h * 0.05);
    // Delicate bridal foot with even warm complexion & mehndi / payal
    ctx.fillStyle = '#ce8252';
    ctx.beginPath();
    ctx.ellipse(w * 0.02, h * 0.38, w * 0.12, h * 0.055, 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#f59e0b'; // golden anklet/payal
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // Front leg & Saree
    ctx.save();
    ctx.translate(-w * 0.03, h * 0.06);
    ctx.rotate(leftLegAngle);
    // Cream & Gold pleated front
    const pleatGrad = ctx.createLinearGradient(-w * 0.15, 0, w * 0.15, h * 0.36);
    pleatGrad.addColorStop(0, '#fffbeb');
    pleatGrad.addColorStop(0.4, '#fef3c7');
    pleatGrad.addColorStop(1, '#be123c');
    ctx.fillStyle = pleatGrad;
    ctx.beginPath();
    ctx.roundRect(-w * 0.13, 0, w * 0.26, h * 0.38, 9);
    ctx.fill();
    // Gold zari border
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-w * 0.13, h * 0.32, w * 0.26, h * 0.06);
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 2;
    ctx.strokeRect(-w * 0.13, h * 0.32, w * 0.26, h * 0.06);
    // Foot with even warm skin matching Vishnu & photo
    ctx.fillStyle = '#ce8252';
    ctx.beginPath();
    ctx.ellipse(w * 0.04, h * 0.4, w * 0.13, h * 0.06, 0.18, 0, Math.PI * 2);
    ctx.fill();
    // Gold payal
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // Torso: Blouse & Saree Draping
    ctx.save();
    ctx.translate(0, -h * 0.22);
    // Red embroidered blouse
    ctx.fillStyle = '#991b1b';
    ctx.beginPath();
    ctx.roundRect(-w * 0.16, 0, w * 0.32, h * 0.3, 8);
    ctx.fill();

    // Diagonal cream/gold saree drape across torso
    ctx.fillStyle = '#fffbeb';
    ctx.beginPath();
    ctx.moveTo(-w * 0.16, h * 0.15);
    ctx.lineTo(w * 0.15, 0);
    ctx.lineTo(w * 0.15, h * 0.12);
    ctx.lineTo(-w * 0.16, h * 0.28);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Royal Gold Vaddanam (Waist Belt / Kamarbandh)
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-w * 0.17, h * 0.27, w * 0.34, h * 0.04);
    ctx.fillStyle = '#ef4444'; // ruby stone
    ctx.beginPath();
    ctx.arc(0, h * 0.29, 3, 0, Math.PI * 2);
    ctx.fill();

    // Layered Gold Bridal Necklaces (Kasu malai / Manga malai)
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, h * 0.08, w * 0.1, 0, Math.PI);
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, h * 0.08, w * 0.14, 0, Math.PI);
    ctx.stroke();

    // Arms
    // Left arm running forward with bangles & mehndi
    ctx.save();
    ctx.translate(w * 0.13, h * 0.04);
    ctx.rotate(-armSwing * 0.8 + 0.3);
    // Blouse short sleeve
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(-w * 0.05, 0, w * 0.1, h * 0.1);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-w * 0.05, h * 0.08, w * 0.1, h * 0.025);
    // Forearm - even warm bridal complexion matching groom & portrait
    ctx.fillStyle = '#ce8252';
    ctx.fillRect(-w * 0.04, h * 0.1, w * 0.08, h * 0.12);
    // Red & Gold Bangles
    for (let b = 0; b < 3; b++) {
      ctx.fillStyle = b % 2 === 0 ? '#dc2626' : '#f59e0b';
      ctx.fillRect(-w * 0.05, h * (0.16 + b * 0.02), w * 0.1, 2);
    }
    // Hand with Mehndi & even warm complexion
    ctx.fillStyle = '#ce8252';
    ctx.beginPath();
    ctx.arc(0, h * 0.23, w * 0.05, 0, Math.PI * 2);
    ctx.fill();
    // Henna motif on palm - deep bridal maroon
    ctx.fillStyle = '#6b1d1d';
    ctx.beginPath();
    ctx.arc(0, h * 0.23, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Head & Face
    ctx.save();
    ctx.translate(w * 0.02, -h * 0.14);

    // Neck - natural contour shadow matching skin tone
    ctx.fillStyle = '#b86a3e';
    ctx.fillRect(-w * 0.05, h * 0.07, w * 0.1, h * 0.05);

    // Head - radiant even warm complexion
    ctx.fillStyle = '#ce8252';
    ctx.beginPath();
    ctx.ellipse(0, 0, w * 0.15, h * 0.125, 0, 0, Math.PI * 2);
    ctx.fill();

    // Subtle rosy bridal blush
    ctx.fillStyle = 'rgba(244, 63, 94, 0.2)';
    ctx.beginPath();
    ctx.arc(w * 0.08, h * 0.02, w * 0.035, 0, Math.PI * 2);
    ctx.fill();

    // Red Bridal Bindi
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(w * 0.04, -h * 0.02, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Gold Maang Tikka
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w * 0.04, -h * 0.1);
    ctx.lineTo(w * 0.04, -h * 0.035);
    ctx.stroke();
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(w * 0.04, -h * 0.035, 2.8, 0, Math.PI * 2);
    ctx.fill();

    // Golden Jhumka earrings
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(-w * 0.11, h * 0.03, 3.5, 0, Math.PI * 2);
    ctx.arc(-w * 0.11, h * 0.06, 4.5, 0, Math.PI * 2);
    ctx.fill();

    // Golden Nath (Nose ring)
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(w * 0.09, 0, 3, 0, Math.PI * 2);
    ctx.stroke();

    // Smiling Bridal Lips
    ctx.fillStyle = '#e11d48';
    ctx.beginPath();
    ctx.arc(w * 0.04, h * 0.04, w * 0.045, 0, Math.PI);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(w * 0.04, h * 0.035, w * 0.03, 0, Math.PI);
    ctx.fill();

    // Large Sparkly Bridal Eyes with Kohl (Kajal)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(w * 0.05, -h * 0.015, w * 0.045, h * 0.026, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.arc(w * 0.065, -h * 0.015, w * 0.025, 0, Math.PI * 2);
    ctx.fill();
    // Eye catchlight
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(w * 0.075, -h * 0.02, 2, 0, Math.PI * 2);
    ctx.fill();
    // Eyeliner / Kajal wing
    ctx.strokeStyle = '#09090b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w * 0.01, -h * 0.02);
    ctx.quadraticCurveTo(w * 0.06, -h * 0.035, w * 0.11, -h * 0.01);
    ctx.stroke();

    // Dark styled Bridal Bun & Hair
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.arc(0, -h * 0.08, w * 0.16, Math.PI, 0);
    ctx.fill();

    // Jasmine Gajra on hair
    ctx.fillStyle = '#ffffff';
    for (let f = 0; f < 5; f++) {
      const fa = Math.PI + (f / 4) * Math.PI;
      const fx = Math.cos(fa) * (w * 0.16);
      const fy = -h * 0.08 + Math.sin(fa) * (w * 0.14);
      ctx.beginPath();
      ctx.arc(fx, fy, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore(); // Head
    ctx.restore(); // Torso
    ctx.restore(); // Base
  }

  private static drawAkshithaCelebrate(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    frame: number
  ) {
    ctx.save();
    ctx.translate(w * 0.5, h * 0.5);

    // Saree standing elegant
    const pleatGrad = ctx.createLinearGradient(-w * 0.2, 0, w * 0.2, h * 0.4);
    pleatGrad.addColorStop(0, '#be123c');
    pleatGrad.addColorStop(0.6, '#e11d48');
    pleatGrad.addColorStop(1, '#f59e0b');
    ctx.fillStyle = pleatGrad;
    ctx.beginPath();
    ctx.roundRect(-w * 0.2, h * 0.05, w * 0.4, h * 0.38, [6, 6, 12, 12]);
    ctx.fill();
    // Gold zari border
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-w * 0.2, h * 0.38, w * 0.4, h * 0.05);

    // Torso
    ctx.fillStyle = '#991b1b';
    ctx.beginPath();
    ctx.roundRect(-w * 0.16, -h * 0.22, w * 0.32, h * 0.3, 8);
    ctx.fill();

    // Waist belt
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-w * 0.17, h * 0.05, w * 0.34, h * 0.04);

    // Clapping hands together in celebration!
    const clapOffset = Math.sin(frame * 0.35) * 4;
    // Hands - even warm complexion
    ctx.fillStyle = '#ce8252';
    ctx.beginPath();
    ctx.arc(-w * 0.04 - clapOffset, -h * 0.08, w * 0.055, 0, Math.PI * 2);
    ctx.arc(w * 0.04 + clapOffset, -h * 0.08, w * 0.055, 0, Math.PI * 2);
    ctx.fill();
    // Bangles
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-w * 0.08, -h * 0.06, w * 0.16, 3);

    // Head - radiant even warm complexion
    ctx.fillStyle = '#ce8252';
    ctx.beginPath();
    ctx.ellipse(0, -h * 0.28, w * 0.15, h * 0.125, 0, 0, Math.PI * 2);
    ctx.fill();

    // Radiant bridal blush in celebration
    ctx.fillStyle = 'rgba(244, 63, 94, 0.2)';
    ctx.beginPath();
    ctx.arc(0, -h * 0.26, w * 0.05, 0, Math.PI * 2);
    ctx.fill();

    // Radiant smile
    ctx.fillStyle = '#e11d48';
    ctx.beginPath();
    ctx.arc(0, -h * 0.25, w * 0.06, 0, Math.PI);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, -h * 0.255, w * 0.04, 0, Math.PI);
    ctx.fill();

    // Joyful curved sparkling eyes
    ctx.strokeStyle = '#1c1917';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(-w * 0.05, -h * 0.3, w * 0.035, Math.PI, 0);
    ctx.arc(w * 0.05, -h * 0.3, w * 0.035, Math.PI, 0);
    ctx.stroke();

    // Bindi & Maang Tikka
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(0, -h * 0.31, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(0, -h * 0.34, 3, 0, Math.PI * 2);
    ctx.fill();

    // Hair & Jasmine flowers
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.arc(0, -h * 0.36, w * 0.15, Math.PI, 0);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    for (let f = 0; f < 5; f++) {
      ctx.beginPath();
      ctx.arc(-w * 0.12 + f * (w * 0.06), -h * 0.36, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Sparkles and Floating Hearts
    for (let hrt = 0; hrt < 6; hrt++) {
      const hx = Math.sin(frame * 0.12 + hrt * 1.5) * (w * 0.4);
      const hy = -h * 0.44 - (hrt * 8);
      ctx.fillStyle = '#ec4899';
      ctx.font = '14px sans-serif';
      ctx.fillText('💖', hx, hy);
    }

    ctx.restore();
  }

  // --- OBSTACLE 1: THE AUNTIES ---
  public static drawAunties(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, frame: number) {
    ctx.save();
    ctx.translate(x, y);

    // Two smiling aunties standing together ready to stop you with love!
    // Auntie 1 (Pink / Magenta saree)
    ctx.save();
    ctx.translate(w * 0.28, h * 0.5);
    const wave1 = Math.sin(frame * 0.15) * 0.1;
    ctx.rotate(wave1);

    // Saree
    ctx.fillStyle = '#db2777';
    ctx.beginPath();
    ctx.roundRect(-w * 0.2, 0, w * 0.4, h * 0.48, [8, 8, 12, 12]);
    ctx.fill();
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-w * 0.2, h * 0.44, w * 0.4, h * 0.04);

    // Torso & Blouse
    ctx.fillStyle = '#9d174d';
    ctx.beginPath();
    ctx.roundRect(-w * 0.18, -h * 0.25, w * 0.36, h * 0.28, 8);
    ctx.fill();
    // Green/gold saree pallu
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.moveTo(-w * 0.18, -h * 0.1);
    ctx.lineTo(w * 0.15, -h * 0.25);
    ctx.lineTo(w * 0.15, -h * 0.15);
    ctx.lineTo(-w * 0.18, 0);
    ctx.closePath();
    ctx.fill();

    // Waving hands ("Wait wait beta!") - natural warm South Indian skin
    ctx.fillStyle = '#ce8252';
    ctx.beginPath();
    ctx.arc(w * 0.18, -h * 0.12, w * 0.07, 0, Math.PI * 2);
    ctx.fill();

    // Head - even warm skin
    ctx.fillStyle = '#ce8252';
    ctx.beginPath();
    ctx.arc(0, -h * 0.33, w * 0.15, 0, Math.PI * 2);
    ctx.fill();
    // Bindi
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(0, -h * 0.35, 2.5, 0, Math.PI * 2);
    ctx.fill();
    // Warm smile
    ctx.strokeStyle = '#881337';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, -h * 0.3, w * 0.06, 0, Math.PI);
    ctx.stroke();
    // Hair bun with flowers
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(0, -h * 0.42, w * 0.14, Math.PI, 0);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, -h * 0.43, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Auntie 2 (Teal / Turquoise Saree)
    ctx.save();
    ctx.translate(w * 0.72, h * 0.5);
    const wave2 = -Math.sin(frame * 0.15 + 1) * 0.1;
    ctx.rotate(wave2);

    ctx.fillStyle = '#0d9488';
    ctx.beginPath();
    ctx.roundRect(-w * 0.2, 0, w * 0.4, h * 0.48, [8, 8, 12, 12]);
    ctx.fill();
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-w * 0.2, h * 0.44, w * 0.4, h * 0.04);

    ctx.fillStyle = '#115e59';
    ctx.beginPath();
    ctx.roundRect(-w * 0.18, -h * 0.25, w * 0.36, h * 0.28, 8);
    ctx.fill();
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.moveTo(-w * 0.18, -h * 0.1);
    ctx.lineTo(w * 0.15, -h * 0.25);
    ctx.lineTo(w * 0.15, -h * 0.15);
    ctx.lineTo(-w * 0.18, 0);
    ctx.closePath();
    ctx.fill();

    // Waving hand - even warm skin
    ctx.fillStyle = '#ce8252';
    ctx.beginPath();
    ctx.arc(-w * 0.18, -h * 0.12, w * 0.07, 0, Math.PI * 2);
    ctx.fill();

    // Head - even warm skin
    ctx.fillStyle = '#ce8252';
    ctx.beginPath();
    ctx.arc(0, -h * 0.33, w * 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(0, -h * 0.35, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#881337';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, -h * 0.3, w * 0.06, 0, Math.PI);
    ctx.stroke();
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(0, -h * 0.42, w * 0.14, Math.PI, 0);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, -h * 0.43, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  // --- OBSTACLE 2: MUSICIAN (Nadaswaram / Shehnai & Dhol Drummer) ---
  public static drawMusician(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, frame: number) {
    ctx.save();
    ctx.translate(x, y);

    const beatBob = Math.sin(frame * 0.3) * 3;

    // Musician in white silk dhoti with gold border
    ctx.save();
    ctx.translate(w * 0.5, h * 0.52 + beatBob);

    // Dhoti legs
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(-w * 0.22, 0, w * 0.44, h * 0.45, 6);
    ctx.fill();
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-w * 0.22, h * 0.4, w * 0.44, h * 0.05);

    // Bare chest or Angavastram over shoulder - even warm South Indian skin
    ctx.fillStyle = '#ce8252';
    ctx.beginPath();
    ctx.roundRect(-w * 0.2, -h * 0.28, w * 0.4, h * 0.3, 8);
    ctx.fill();

    // Sacred vibhuti / tilak on chest
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-w * 0.08, -h * 0.18);
    ctx.lineTo(w * 0.08, -h * 0.18);
    ctx.stroke();

    // Thavil / Dhol Drum hanging across waist
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.roundRect(-w * 0.26, -h * 0.05, w * 0.32, h * 0.25, 8);
    ctx.fill();
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.ellipse(-w * 0.26, h * 0.075, w * 0.06, h * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Nadaswaram / Shehnai pipe blowing into mouth
    ctx.save();
    ctx.translate(0, -h * 0.22);
    ctx.rotate(0.35 + Math.sin(frame * 0.25) * 0.05);
    ctx.fillStyle = '#451a03'; // dark polished rosewood pipe
    ctx.fillRect(0, -3, w * 0.45, 6);
    // Brass flared horn at end
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(w * 0.45, -8);
    ctx.lineTo(w * 0.58, -14);
    ctx.lineTo(w * 0.58, 14);
    ctx.lineTo(w * 0.45, 8);
    ctx.closePath();
    ctx.fill();
    // Musical notes floating from horn!
    ctx.fillStyle = '#eab308';
    ctx.font = '12px sans-serif';
    ctx.fillText('🎶', w * 0.62, -10 + Math.sin(frame * 0.2) * 5);
    ctx.restore();

    // Head - even warm skin
    ctx.fillStyle = '#ce8252';
    ctx.beginPath();
    ctx.arc(0, -h * 0.34, w * 0.16, 0, Math.PI * 2);
    ctx.fill();
    // Tilak
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(-1.5, -h * 0.38, 3, 6);
    // Hair
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.arc(0, -h * 0.42, w * 0.15, Math.PI, 0);
    ctx.fill();

    ctx.restore();
    ctx.restore();
  }

  // --- OBSTACLE 3: THE PHOTOGRAPHERS (With Camera Flash!) ---
  public static drawPhotographers(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, flashTimer: number = 0) {
    ctx.save();
    ctx.translate(x, y);

    // Two energetic photographers crouched with big telephoto lenses
    // Photographer 1 (Blue shirt)
    ctx.save();
    ctx.translate(w * 0.3, h * 0.55);
    // Pants
    ctx.fillStyle = '#334155';
    ctx.fillRect(-w * 0.18, 0, w * 0.36, h * 0.42);
    // Shirt
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.roundRect(-w * 0.18, -h * 0.25, w * 0.36, h * 0.27, 6);
    ctx.fill();
    // Head & Camera - even warm skin
    ctx.fillStyle = '#ce8252';
    ctx.beginPath();
    ctx.arc(0, -h * 0.32, w * 0.14, 0, Math.PI * 2);
    ctx.fill();
    // Black DSLR Camera
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-w * 0.05, -h * 0.32, w * 0.22, h * 0.14);
    ctx.fillRect(w * 0.15, -h * 0.29, w * 0.12, h * 0.09); // big lens
    ctx.restore();

    // Photographer 2 (Pink shirt) with large flash mounted
    ctx.save();
    ctx.translate(w * 0.72, h * 0.5);
    ctx.fillStyle = '#475569';
    ctx.fillRect(-w * 0.18, 0, w * 0.36, h * 0.45);
    ctx.fillStyle = '#c026d3';
    ctx.beginPath();
    ctx.roundRect(-w * 0.18, -h * 0.28, w * 0.36, h * 0.3, 6);
    ctx.fill();
    ctx.fillStyle = '#ce8252';
    ctx.beginPath();
    ctx.arc(0, -h * 0.36, w * 0.14, 0, Math.PI * 2);
    ctx.fill();
    // DSLR with Speedlight flash
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-w * 0.08, -h * 0.36, w * 0.22, h * 0.14);
    ctx.fillRect(-w * 0.02, -h * 0.48, w * 0.1, h * 0.12); // Flash strobe
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, -h * 0.47, w * 0.06, h * 0.05);

    // Strobe Flash Burst Effect!
    if (flashTimer > 0) {
      const flashAlpha = Math.min(1, flashTimer / 10);
      ctx.save();
      ctx.translate(w * 0.03, -h * 0.45);
      const flashGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, 80);
      flashGrad.addColorStop(0, `rgba(255, 255, 255, ${flashAlpha * 0.95})`);
      flashGrad.addColorStop(0.3, `rgba(254, 240, 138, ${flashAlpha * 0.6})`);
      flashGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = flashGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 80, 0, Math.PI * 2);
      ctx.fill();

      // Optical flare star rays
      ctx.strokeStyle = `rgba(255, 255, 255, ${flashAlpha * 0.9})`;
      ctx.lineWidth = 3;
      for (let r = 0; r < 4; r++) {
        const ang = (r * Math.PI) / 4;
        ctx.beginPath();
        ctx.moveTo(Math.cos(ang) * -60, Math.sin(ang) * -60);
        ctx.lineTo(Math.cos(ang) * 60, Math.sin(ang) * 60);
        ctx.stroke();
      }
      ctx.restore();
    }

    ctx.restore();
    ctx.restore();
  }

  // --- OBSTACLE 4: SHORTER OBSTACLE (Pots, Marigolds, Coconuts) ---
  public static drawShorterPot(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    ctx.save();
    ctx.translate(x, y);

    // Festive terracotta painted pots cluster with coconuts and marigolds
    // Base pot 1 (left)
    ctx.fillStyle = '#ea580c';
    ctx.beginPath();
    ctx.arc(w * 0.35, h * 0.65, w * 0.32, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Base pot 2 (right)
    ctx.fillStyle = '#c2410c';
    ctx.beginPath();
    ctx.arc(w * 0.68, h * 0.68, w * 0.28, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Top pot
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.arc(w * 0.48, h * 0.38, w * 0.24, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#15803d';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Green mango leaves
    ctx.fillStyle = '#16a34a';
    for (let l = 0; l < 5; l++) {
      const la = -0.8 + (l / 4) * 1.6;
      ctx.save();
      ctx.translate(w * 0.48, h * 0.2);
      ctx.rotate(la);
      ctx.beginPath();
      ctx.ellipse(0, -12, 5, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Sacred Coconut on top
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.ellipse(w * 0.48, h * 0.16, w * 0.12, h * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Marigold flower platters & garlands wrapping the pots
    for (let m = 0; m < 9; m++) {
      const mx = w * 0.15 + (m / 8) * (w * 0.7);
      const my = h * 0.88 + Math.sin(m * 1.5) * 6;
      ctx.fillStyle = m % 2 === 0 ? '#f59e0b' : '#ea580c';
      ctx.beginPath();
      ctx.arc(mx, my, 7, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  // --- OBSTACLE 5: POT STACK (Tall ceremonial Kalash stack) ---
  public static drawPotStack(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    ctx.save();
    ctx.translate(x, y);

    // Tier 1: Large base pot
    const p1Grad = ctx.createLinearGradient(0, h * 0.6, w, h);
    p1Grad.addColorStop(0, '#ea580c');
    p1Grad.addColorStop(1, '#9a3412');
    ctx.fillStyle = p1Grad;
    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 0.78, w * 0.42, h * 0.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Tier 2: Middle pot
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 0.52, w * 0.32, h * 0.16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Tier 3: Small top pot
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 0.3, w * 0.22, h * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#15803d';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Mango leaves
    ctx.fillStyle = '#16a34a';
    for (let l = 0; l < 5; l++) {
      const la = -0.9 + (l / 4) * 1.8;
      ctx.save();
      ctx.translate(w * 0.5, h * 0.2);
      ctx.rotate(la);
      ctx.beginPath();
      ctx.ellipse(0, -14, 6, 16, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Coconut
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 0.15, w * 0.12, h * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // --- OBSTACLE 6: MARIGOLD GARLAND BARRIER (Two Banana Trees + Hanging Toran Garland) ---
  // Note: High obstacle where player can slide under or jump!
  public static drawMarigoldBarrier(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, frame: number) {
    ctx.save();
    ctx.translate(x, y);

    // Left Banana Tree (Vazhaimaram)
    ctx.fillStyle = '#65a30d';
    ctx.fillRect(w * 0.05, h * 0.15, w * 0.08, h * 0.85);
    // Big green banana leaves on left
    ctx.fillStyle = '#4d7c0f';
    for (let l = 0; l < 4; l++) {
      ctx.save();
      ctx.translate(w * 0.09, h * 0.18);
      ctx.rotate(-0.4 - l * 0.3);
      ctx.beginPath();
      ctx.ellipse(0, -20, 10, 32, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Right Banana Tree
    ctx.fillStyle = '#65a30d';
    ctx.fillRect(w * 0.87, h * 0.15, w * 0.08, h * 0.85);
    // Leaves on right
    for (let l = 0; l < 4; l++) {
      ctx.save();
      ctx.translate(w * 0.91, h * 0.18);
      ctx.rotate(0.4 + l * 0.3);
      ctx.beginPath();
      ctx.ellipse(0, -20, 10, 32, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Wooden crossbeam with Toran
    ctx.fillStyle = '#b45309';
    ctx.fillRect(w * 0.05, h * 0.16, w * 0.9, h * 0.06);

    // Hanging Marigold Garlands (swaying gently)
    const sway = Math.sin(frame * 0.1) * 3;
    for (let g = 0; g < 7; g++) {
      const gx = w * 0.16 + g * (w * 0.11);
      const garlandH = h * (0.28 + (g % 3) * 0.06);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(gx, h * 0.2);
      ctx.quadraticCurveTo(gx + sway, h * 0.2 + garlandH * 0.5, gx + sway * 1.5, h * 0.2 + garlandH);
      ctx.stroke();

      // Marigold flower balls
      for (let f = 0; f < 4; f++) {
        const fy = h * 0.22 + f * (garlandH / 4);
        ctx.fillStyle = f % 2 === 0 ? '#f59e0b' : '#ea580c';
        ctx.beginPath();
        ctx.arc(gx + sway * (f / 3), fy, 5.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }

  // --- OBSTACLE 7: BRIDAL DOLI (Golden Palanquin) ---
  public static drawBridalDoli(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    ctx.save();
    ctx.translate(x, y);

    // Carrying wooden/gold poles extending out
    ctx.fillStyle = '#d97706';
    ctx.fillRect(-w * 0.15, h * 0.55, w * 1.3, h * 0.08);

    // Golden Doli Pavilion Arch
    const doliGrad = ctx.createLinearGradient(0, 0, w, h);
    doliGrad.addColorStop(0, '#fef08a');
    doliGrad.addColorStop(0.5, '#f59e0b');
    doliGrad.addColorStop(1, '#b45309');
    ctx.fillStyle = doliGrad;

    // Carved dome
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.35, w * 0.4, Math.PI, 0);
    ctx.fill();
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Dome kalash pinnacle
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(w * 0.5, h * -0.05, 8, 0, Math.PI * 2);
    ctx.fill();

    // Doli main body / silk curtains
    ctx.fillStyle = '#881337'; // royal velvet red
    ctx.fillRect(w * 0.15, h * 0.35, w * 0.7, h * 0.48);
    // Ornate gold window curtains
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.roundRect(w * 0.25, h * 0.42, w * 0.5, h * 0.36, 12);
    ctx.fill();
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Marigold festoons along doli eaves
    for (let f = 0; f < 8; f++) {
      ctx.fillStyle = f % 2 === 0 ? '#f59e0b' : '#ea580c';
      ctx.beginPath();
      ctx.arc(w * 0.18 + f * (w * 0.09), h * 0.35, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  // --- COLLECTIBLE 1: COIN ---
  public static drawCoin(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, frame: number) {
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);
    // Gentle 3D spin illusion
    const spin = Math.cos(frame * 0.12);
    ctx.scale(Math.abs(spin) * 0.6 + 0.4, 1);

    // Glowing shadow
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 12;

    // Coin outer ring
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(0, 0, w * 0.46, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Inner embossed star / lotus
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(0, 0, w * 0.32, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#d97706';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('₹', 0, 1);

    ctx.restore();
  }

  // --- COLLECTIBLE 2: LADDU ---
  public static drawLaddu(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);

    // Golden bowl (katori)
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.ellipse(0, h * 0.28, w * 0.45, h * 0.18, 0, 0, Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Cluster of 3 Motichoor laddus
    const ladduPositions = [
      { x: -w * 0.16, y: h * 0.1 },
      { x: w * 0.16, y: h * 0.1 },
      { x: 0, y: -h * 0.08 }
    ];

    ladduPositions.forEach(pos => {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, w * 0.22, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ea580c';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Pistachio green specks on laddu
      ctx.fillStyle = '#16a34a';
      ctx.beginPath();
      ctx.arc(pos.x - 3, pos.y - 3, 1.8, 0, Math.PI * 2);
      ctx.arc(pos.x + 4, pos.y + 2, 1.8, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  }

  // --- COLLECTIBLE 3: KALASH (Invincibility Shield) ---
  public static drawKalash(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, frame: number) {
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);

    // Divine pulsating aura
    const pulse = Math.sin(frame * 0.15) * 6;
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 16 + pulse;

    // Brass Kalash Pot
    const kalashGrad = ctx.createLinearGradient(-w * 0.3, 0, w * 0.3, h * 0.3);
    kalashGrad.addColorStop(0, '#fde047');
    kalashGrad.addColorStop(1, '#d97706');
    ctx.fillStyle = kalashGrad;
    ctx.beginPath();
    ctx.arc(0, h * 0.12, w * 0.38, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#dc2626'; // Sacred red thread (mauli)
    ctx.lineWidth = 3;
    ctx.stroke();

    // Mango leaves
    ctx.fillStyle = '#16a34a';
    for (let l = 0; l < 5; l++) {
      const la = -0.8 + (l / 4) * 1.6;
      ctx.save();
      ctx.translate(0, -h * 0.12);
      ctx.rotate(la);
      ctx.beginPath();
      ctx.ellipse(0, -10, 4, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Sacred coconut
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.ellipse(0, -h * 0.18, w * 0.14, h * 0.14, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // --- COLLECTIBLE 4: GARLAND POWER-UP (Varmala Magnet & Speed) ---
  public static drawGarland(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, frame: number) {
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);

    // Pulsing floral glow
    const pulse = Math.sin(frame * 0.18) * 8;
    ctx.shadowColor = '#f43f5e';
    ctx.shadowBlur = 16 + pulse;

    // Garland heart/loop
    const totalFlowers = 12;
    for (let i = 0; i < totalFlowers; i++) {
      const angle = (i / totalFlowers) * Math.PI * 2;
      const fx = Math.cos(angle) * (w * 0.38);
      const fy = Math.sin(angle) * (h * 0.38);

      // Alternating red rose and white jasmine
      ctx.fillStyle = i % 2 === 0 ? '#e11d48' : '#ffffff';
      ctx.beginPath();
      ctx.arc(fx, fy, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#15803d';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Gold ribbon bow at top
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(0, -h * 0.38, 6.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // --- WEDDING MANDAP FINISH STAGE ---
  public static drawWeddingMandap(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    partnerType: CharacterType,
    frame: number
  ) {
    ctx.save();
    ctx.translate(x, y);

    // Royal Mandap Pillars (Left and Right)
    const pillarGrad = ctx.createLinearGradient(0, 0, w, 0);
    pillarGrad.addColorStop(0, '#d97706');
    pillarGrad.addColorStop(0.5, '#fef08a');
    pillarGrad.addColorStop(1, '#b45309');

    // Left Pillar
    ctx.fillStyle = pillarGrad;
    ctx.fillRect(0, 0, 36, h);
    // Right Pillar
    ctx.fillRect(w - 36, 0, 36, h);

    // Ornate Mandap Arch on top
    ctx.fillStyle = pillarGrad;
    ctx.beginPath();
    ctx.arc(w / 2, 80, w / 2 - 20, Math.PI, 0);
    ctx.fill();
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Hanging Marigold Torans & Fairy Lights
    for (let t = 0; t < 15; t++) {
      const tx = 40 + (t / 14) * (w - 80);
      const ty = 70 + Math.sin((t / 14) * Math.PI) * 35;
      ctx.fillStyle = t % 2 === 0 ? '#f59e0b' : '#ea580c';
      ctx.beginPath();
      ctx.arc(tx, ty, 7, 0, Math.PI * 2);
      ctx.fill();
      // Glowing fairy light bulb
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(tx, ty + 12, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Grand Wedding Stage Carpet
    ctx.fillStyle = '#881337';
    ctx.fillRect(20, h - 35, w - 40, 35);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(20, h - 35, w - 40, 5);

    // Partner waiting at Mandap!
    const partnerX = w / 2 - 45;
    const partnerY = h - 145;
    if (partnerType === 'akshitha') {
      // Waiting Bride Akshitha waving!
      this.drawAkshitha(ctx, partnerX, partnerY, 90, 115, 'celebrate', frame, false);
    } else {
      // Waiting Groom Vishnu smiling!
      this.drawVishnu(ctx, partnerX, partnerY, 90, 115, 'celebrate', frame, false);
    }

    // Sacred Wedding Fire (Havan Kund) in center
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.moveTo(w / 2 - 30, h - 10);
    ctx.lineTo(w / 2 + 30, h - 10);
    ctx.lineTo(w / 2 + 20, h - 32);
    ctx.lineTo(w / 2 - 20, h - 32);
    ctx.closePath();
    ctx.fill();
    // Fire flames dancing
    const flameH = 18 + Math.sin(frame * 0.4) * 6;
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(w / 2 - 15, h - 32);
    ctx.quadraticCurveTo(w / 2, h - 32 - flameH, w / 2 + 15, h - 32);
    ctx.fill();
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.moveTo(w / 2 - 8, h - 32);
    ctx.quadraticCurveTo(w / 2, h - 32 - flameH * 0.7, w / 2 + 8, h - 32);
    ctx.fill();

    ctx.restore();
  }
}
