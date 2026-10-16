export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  // Long, architectural deceleration for image wipes
  wipe: [0.7, 0, 0.2, 1] as const,
};

export const duration = { fast: 0.18, base: 0.32, slow: 0.6, hero: 1.1 };

export const spring = { type: "spring", stiffness: 380, damping: 32, mass: 0.8 } as const;

export const stagger = 0.06;
