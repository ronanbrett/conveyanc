/* eslint-disable */
import anime from 'animejs';
import { Circle } from './Circle';

export const generateParticles = (ctx: CanvasRenderingContext2D) => {
  const PARTICLES = [];
  const ANIMS: any[] = [];

  function removeAnimation(animation: any) {
    const index = ANIMS.indexOf(animation);
    if (index > -1) ANIMS.splice(index, 1);
  }

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 32; i++) {
    const particle = new Circle(ctx, {
      x: 125,
      y: 50,
      fill: 'blue',
      r: anime.random(5, 45),
    });
    PARTICLES.push(particle);
  }

  const rippleSize = 120;

  const RIPPLE_ANIMATIONS = anime({
    targets: PARTICLES,
    x: (particle: any) => {
      return particle.x + anime.random(rippleSize, -rippleSize);
    },
    y: (particle: any) => {
      return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
    },
    r: 0,
    easing: 'easeOutExpo',
    duration: anime.random(1000, 1300),
    complete: removeAnimation,
  });

  ANIMS.push(RIPPLE_ANIMATIONS);

  const animate = anime({
    duration: Infinity,
    update: () => {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, 500, 500);
      ANIMS.forEach((anim) => {
        anim.animatables.forEach((animatable: any) => {
          animatable.target.draw();
        });
      });
    },
  });
};
