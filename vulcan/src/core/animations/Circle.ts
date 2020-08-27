export interface CircleOpts {
  x: number;
  y: number;
  r: number;

  opacity?: number;
  stroke?: { color: string; width: number };
  fill?: string;
}

export class Circle {
  x: number;

  y: number;

  r: number;

  opacity?: number;

  stroke?: { color: string; width: number };

  fill?: string;

  constructor(private ctx: CanvasRenderingContext2D, private options: CircleOpts) {
    this.x = options.x;
    this.y = options.y;
    this.r = options.r;
    this.opacity = options.opacity;
    this.stroke = options.stroke;
    this.fill = options.fill;
  }

  draw() {
    this.ctx.globalAlpha = this.opacity || 1;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    if (this.stroke) {
      this.ctx.strokeStyle = this.stroke.color;
      this.ctx.lineWidth = this.stroke.width;
      this.ctx.stroke();
    }
    if (this.fill) {
      this.ctx.fillStyle = this.fill;
      this.ctx.fill();
    }
    this.ctx.closePath();
    this.ctx.globalAlpha = 1;
  }
}
