export const parseMetricToNum = (metric: number | string) => {
  if (typeof metric === "number") return metric;
  if (metric.match(/\s/) && process.env.NODE_ENV !== "production") {
    console.warn(`Invalid single measurement value: "${metric}"`);
  }
  return true;
};

const POST_DECIMAL_DIGITS = 10;

export const baseUnit = 24;

export const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

export const arcCommands = (
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
) => {
  // handle that we can't draw a complete circle
  let normalizedEndAngle = endAngle;
  if (endAngle - startAngle >= 360) {
    normalizedEndAngle = startAngle + 359.99;
  }
  const start = polarToCartesian(centerX, centerY, radius, normalizedEndAngle);
  const end = polarToCartesian(centerX, centerY, radius, startAngle);
  const arcSweep = normalizedEndAngle - startAngle <= 180 ? "0" : "1";
  const d = [
    "M",
    start.x.toFixed(POST_DECIMAL_DIGITS),
    start.y.toFixed(POST_DECIMAL_DIGITS),
    "A",
    radius.toFixed(POST_DECIMAL_DIGITS),
    radius.toFixed(POST_DECIMAL_DIGITS),
    0,
    arcSweep,
    0,
    end.x.toFixed(POST_DECIMAL_DIGITS),
    end.y.toFixed(POST_DECIMAL_DIGITS),
  ].join(" ");
  return d;
};

export const translateEndAngle = (
  startAngle: number,
  anglePer: number,
  value: number
) => Math.min(360, Math.max(0, startAngle + anglePer * value));
